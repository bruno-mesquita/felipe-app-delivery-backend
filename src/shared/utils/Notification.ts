import axios, { AxiosInstance } from 'axios';

type SendData = {
  targetId: number;
  type: 'Client' | 'Partner';
  data: {
    title: string;
    data?: any;
    subtitle?: string;
    body?: string;
  }
}

type AddListenerData = {
  targetId: number;
  type: 'Client' | 'Partner';
  token: string,
}

class Notification {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({ baseURL: process.env.API_NOTIFCATIONS });
  }

  async addListener(addListenerData: AddListenerData) {
    try {
      await this.api.post<AddListenerData>('/push-tokens', addListenerData)
    } catch (err) {
      // throw new ApiError('Erro ao cadastrar notificações');
    }
  }

  async send(data: SendData) {
    try {
      await this.api.post<SendData>('/notifications', data)
    } catch (err) {
      // throw new ApiError('Erro ao enviar notificação');
    }
  }
}

export default Notification;
