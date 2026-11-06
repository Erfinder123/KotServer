import type { INavigationItem } from "../BaseButtonComponent.tsx"
import printerImage from '../../assets/printer.png'

const printer: INavigationItem = {
    className: "printer",
    src: printerImage,
    alt: "Принтер",
    url: '/printer',
}

export default printer;


export interface Printer {
    id: number;
    name: string;
}

export interface Print {
    id: number;
    pages: string;
}