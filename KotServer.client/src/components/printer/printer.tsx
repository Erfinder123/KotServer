import type { INavigationItem } from "../BaseButtonComponent.tsx"
import printerImage from '../../assets/printer.png'

const printer: INavigationItem = {
    className: "printer",
    src: printerImage,
    alt: "Принтер",
    url: '/printer',
}

export default printer;


export interface IPrinter {
    id: number;
    name: string;
}

export interface IPrint {
    id: number;
    pages: number[];
}

export interface ICheckPages {
    edit: boolean;
}

export function pagesConverter(
    pages: string,
    check?: ICheckPages | null
): number[]

export function pagesConverter(
    pages: number[],
    check?: ICheckPages | null
): string

export function pagesConverter(pages: string | number[], check: ICheckPages | null = null) {
    if (typeof pages === "string") {
        const result: number[] = [];
        const numberPages = pages.trim().split(",")
        for (const page of numberPages) {
            if (page.includes("-")) {
                const _result = page.split("-")
                
                let last: number | string | undefined = _result.at(-1)
                if (last !== undefined) {
                    let first: number | string = _result[0].trim()
                    if (first.includes(" ")) {
                        first = first.replace(" ", "")
                        check!.edit = true;
                    }
                    first = Number(first);

                    last = last.trim()
                    if (last.includes(" ")) {
                        last = last.replace(" ", "")
                        check!.edit = true;
                    }
                    last = Number(last);

                    if (first < last) {
                        result.push(first);
                        result.push(-1);
                        result.push(last);
                    } else {
                        result.push(last);
                        result.push(-1);
                        result.push(first);
                        check!.edit = true;
                    }
                }
                else {
                    check!.edit = true;
                }
            }
            else {
                let _page = page.trim()
                if (_page.includes(" ")) {
                    _page = _page.replace(" ", "")
                    check!.edit = true;
                }
                result.push(Number(_page))
            }
            result.push(0)
        }
        if (result.at(-1) === 0) {
            result.pop()
        }
        return result;
    }
    else {
        return pages.join().replace("-1", "-").replace("0", ", ").trim()
    }
}