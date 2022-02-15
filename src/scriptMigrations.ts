
import 'dotenv/config';
import Client from "@core/client";
import Image from "@core/image";
import City from "@core/city";
import State from "@core/state";
import Category from "@core/category";
import AddressClient from "@core/address-client";
import Database from "@shared/database"
import { EstablishmentOwner } from '@core/establishment-owner';
import CityManager from '@core/city-manager';
import Admin from '@core/admin';
import Establishment from '@core/establishment';
import AddressEstablishment from '@core/address-establishment';
import EstablishmentCategory from '@core/establishment-category';
import Menu from '@core/menu';
import Product from '@core/product';
import { Deliveryman } from '@core/deliveryman';


import CategoryMongo from '@core/schemas/category.schema';
import CityMongo from '@core/schemas/city.schema';
import ClientMongo from '@core/schemas/client.schema';
import CompanyMongo from '@core/schemas/company.schema';
import deliveryManMongo from '@core/schemas/deliveryMan.schema';
import MenuMongo from '@core/schemas/menu.schema';
import PartnerMongo from '@core/schemas/partner.schema';
import StateMongo from '@core/schemas/state.schema';
import UserMongo from '@core/schemas/user.schema';

const migrationsDeliveryman = async (citiesIds) => {
  await deliveryManMongo.insertMany(
    (await Deliveryman.findAll({ raw: true })).map(e => ({
      name: e.name,
      city: citiesIds[e.city_id],
      cellphone: e.cellphone,
      departureTime: e.departure_date,
      entryTime: e.entry_date,
    }))
  );
}

const migrationsAdmin = async () => {
  const admins = (await Admin.findAll({ raw: true })).map(item => ({
    name: item.name,
    email: item.email,
    password: item.password,
    cellphone: item.cellphone,
    roles: ['Admin'],
    active: item.active,
  }));

  await UserMongo.insertMany(admins);
}

const migrationsStatesAndCities = async () => {
  const states = await State.findAll({ raw: true, attributes: ['id', 'name', 'active'] });
  const cities = await City.findAll({ raw: true, attributes: ['id', 'name', 'active', 'state_id'] });

  const statesMongo = await StateMongo.insertMany(states.map(e => ({ name: e.name, active: e.active })));

  const citiesMongo = await CityMongo.insertMany(cities.map(city => ({
    name: city.name,
    active: city.active,
    state: statesMongo.find(i => i.name === states.find(e => e.id === city.state_id).name)._id,
    neighborhoods: [],
  })));

  const values = {};

  citiesMongo.forEach(city => {
    const item = cities.find(e => e.name === city.name);

    values[item.id] = city._id;
  });

  return values;
};

const migrationsCityManager = async (ids: { [key: number]: string }) => {
  const cityManagers = await CityManager.findAll({ raw: true });

  const cityManagersMongo = await UserMongo.insertMany(await Promise.all(cityManagers.map(async item => {
    const avatar = await Image.findOne({raw: true, where: { id: item.avatar_id } });

    return {
      name: item.name,
      email: item.email,
      password: item.password,
      cellphone: item.cellphone,
      roles: ['CityManager'],
      active: item.active,
      city: ids[item.city_of_action_id],
      avatar: avatar && avatar.encoded,
    }
  })));

  const values = {};

  cityManagersMongo.forEach(e => {
    const item = cityManagers.find(i => i.email === e.email);

    values[item.id] = e._id;
  });

  return values;
};

const migrationsPartners = async (cityManagersIds: any, companiesIds: any) => {
  const owners = await EstablishmentOwner.findAll({ raw: true });

  const partners = await PartnerMongo.insertMany(owners.map(owner => ({
    name: `${owner.first_name} ${owner.last_name}`,
    password: owner.password,
    email: owner.email,
    cellphone: owner.cellphone,
    cpf: owner.cpf,
    createdBy: cityManagersIds[owner.created_by_id],
    company: companiesIds[owner.establishment_id] || null,
  })));

  // const values = {};

  // partners.forEach(e => {
  //   const item = owners.find(i => i.email === e.email);

  //   values[item.id] = e._id;
  // });

  // return values;
};

const migrationsCategories = async () => {
  const oldCategories = await Category.findAll({ raw: true });

  const categories = await CategoryMongo.insertMany(oldCategories.map(e => ({ name: e.name, active: true })));

  const values = {};

  categories.forEach(e => {
    const item = oldCategories.find(i => i.name === e.name);

    values[item.id] = e._id;
  });

  return values;
}

const migrationsCompany = async (citiesIds: any, categoriesIds: any) => {
  const establishments = await Establishment.findAll({ raw: true });

  const companies = await CompanyMongo.insertMany(await Promise.all(establishments.map(async item => {
    const address = await AddressEstablishment.findOne({ raw: true, where: { id: item.address_id } });
    const photo = await Image.findOne({ raw: true, where: { id: item.image_id } });
    const categories = (await EstablishmentCategory.findAll({ raw: true, where: { establishment_id: item.id } })).map(e => categoriesIds[e.category_id]);

    return {
      name: item.name,
      active: item.active,
      cellphone: item.cellphone,
      evaluation: item.evaluation,
      categories,
      photo: photo && photo.encoded,
      address: { ...address, city: citiesIds[address.city_id], zipCode: address.cep },
      cnpj: null,
      paymentOptions: ['Dinheiro', 'Cartão de crédito', 'Cartão de débidto'],
      schedules: {
        monday: { open: item.openingTime, close: item.closingTime },
        tuesday: { open: item.openingTime, close: item.closingTime },
        wednesday: { open: item.openingTime, close: item.closingTime },
        thursday: { open: item.openingTime, close: item.closingTime },
        friday: { open: item.openingTime, close: item.closingTime },
        saturday: { open: item.openingTime, close: item.closingTime },
        sunday: { open: item.openingTime, close: item.closingTime },
      },
      freight: [{ price: item.freightValue, neighborhood: 'Centro' }],
    }
  })));

  const values = {};

  companies.forEach(e => {
    const item = establishments.find(i => i.name === e.name);

    values[item.id] = e._id;
  });

  return values;
}

const migrationsMenusWithProducts = async (establishmentId: number, newId: string) => {
  const menus = await Promise.all((await Menu.findAll({ raw: true, where: { establishment_id: establishmentId } })).map(async menu => {

    const oldProducts = await Product.findAll({
      where: { menu_id: menu.id },
      include: [{ model: Image, as: 'photo' }],
    });

    const products = oldProducts.map(product => ({
      name: product.get('name'),
      description: product.get('description'),
      price: Number(product.get('price')),
      active: product.get('active'),
      photos: [product.get('photo').get('encoded')],
    }));

    return {
      name: menu.name,
      active: true,
      company: newId,
      products,
    }
  }));

  await MenuMongo.insertMany(menus);
};

const migrationsClients = async (citiesIds: any) => {
  const clients = await Client.findAll({ include: [{ model: Image, as: 'avatar' }] });

  const users = await Promise.all(clients.map(async (client) => {
    const adresses = (await AddressClient.findAll({ where: { client_id: client.get('id') }, raw: true })).map(addressClient => ({
      street: addressClient.street,
      number: addressClient.number,
      neighborhood: addressClient.neighborhood,
      nickname: addressClient.nickname,
      active: addressClient.active,
      city: citiesIds[addressClient.city_id],
      zipCode: addressClient.cep,
    }))

    return {
      name: client.get('name').trim(),
      email: client.get('email'),
      password: client.get('password'),
      cellphone: client.get('cellphone').trim(),
      active: client.get('active'),
      cpf: client.get('cpf').trim(),
      avatar: client.get('avatar') && client.get('avatar').get('encoded'),
      adresses,
    }
  }))

  await ClientMongo.insertMany(users);
};

(async () => {
  try {
    const database = new Database();

    await database.init();

    await migrationsAdmin();
    const citiesIds = await migrationsStatesAndCities();
    const cityManagersIds = await migrationsCityManager(citiesIds);
    const categoriesIds = await migrationsCategories();
    const companiesIds = await migrationsCompany(citiesIds, categoriesIds);
    await migrationsPartners(cityManagersIds, companiesIds);

    await Promise.all(Object.keys(companiesIds).map(async (key: any) => {
      await migrationsMenusWithProducts(key, companiesIds[key]);
    }))

    await migrationsClients(citiesIds);
    await migrationsDeliveryman(citiesIds);
  } catch (err) {
    console.log(err);
  }
})()
