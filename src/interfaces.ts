export interface Devices {
    [id: string]: Device;
}

export interface Device {
    id: string
    battery: number
    batteryLevelLastChanged: string
    position: number
    positionLastChanged: string
    connectionState: string
    state: string
    group: string
    name: string
}

