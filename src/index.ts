import * as SOMA from './soma-ctrl';
let Service, Characteristic;

export default function (homebridge: any) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-soma-ctrl", "SOMABlinds", SOMABlinds);
}

class SOMABlinds {
    log: Function;
    config: {};
    base_url: string;
    device_id: string;
    client: SOMA.Ctrl;
    services: any;

    constructor(log, config) {
        this.log = log;
        this.config = config;
        this.device_id = config['device_id'];
        this.services = [];

        if(!config['device_url']){
            this.client = new SOMA.Ctrl(this.device_id);
        } else {
            this.base_url = config['base_url'];
            this.client = new SOMA.Ctrl(this.device_id, this.base_url);
        }

        // Service "Window Covering"
        // https://github.com/KhaosT/HAP-NodeJS/blob/243c112abee13346007db358b13b5bbeda75e0af/lib/gen/HomeKitTypes.js#L3512-L3536
        
    }

    getServices() {
        this.log("getServices");
        return this.services;
    }
}