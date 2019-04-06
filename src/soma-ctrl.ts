import axios, {AxiosInstance, AxiosPromise} from 'axios';
import * as SC from './interfaces';

export class Ctrl {
    private readonly device_id: string;
    private readonly instance: AxiosInstance;

    constructor(device_id: string, base_url?: string) {
        this.device_id = device_id;
        this.instance = axios.create({
            url: '/',
            baseURL: 'https://127.0.0.1:3000/',
            timeout: 5000,
        });
        if(base_url) {
            this.instance.defaults.baseURL = Object.assign(this.instance.defaults.baseURL, base_url);
        }
    }

    public async getStates(): Promise<SC.Devices> {
        return await this._get<SC.Devices>('/');
    }

    public async getState(deviceId: string): Promise<SC.Device> {
        return await this._get<SC.Device>('/' + deviceId);
    }

    public async  move(deviceId: string, position: number): Promise<SC.Device> {
        const params = { position: position};
        return await this._post<SC.Device>('/' + deviceId + '/move', params);
    }


    private async _get<T>(url: string): Promise<T> {
        try {
            const response = await this.instance.get(url);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(`Response code is out of 2xx: ${error.response.status}`);
            }
            throw error;
        }
    }

    private async _post<T>(url: string, params?: object): Promise<T> {
        try {
            if(params) {
                this.instance.defaults.params = Object.assign(this.instance.defaults.params, params);
            }
            const response = await this.instance.post(url);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(`Response code is out of 2xx: ${error.response.status}`);
            }
            throw error;
        }
    }
}