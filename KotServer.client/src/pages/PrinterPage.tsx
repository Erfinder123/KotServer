import { useGetPrintersQuery, useProcessFileMutation, usePrintMutation } from "../api/printerApi.ts";
import { type ChangeEvent, useState } from "react";
import { type Printer, type Print } from "../components/printer/printer.tsx";


function PrinterPage() {
    const { data: printers } = useGetPrintersQuery()
    const [printer, setPrinter] = useState<Printer | undefined>(undefined)
    const [processFile, { data: pageCount, isSuccess, isError }] = useProcessFileMutation()
    const [pages, setPages] = useState<string>("")
    const [all, setAll] = useState<boolean>(true)
    const [print] = usePrintMutation()
    
    const one = printers?.length == 1
    const printersNotFound = (printers?.length ?? 0) == 0
    const pagesSelectionDisabled = (pageCount ?? 0) <= 1
    
    const checkNumbersPages = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        switch (value.at(-1)) {
            case "-":
            case ",":
            case " ":
                break;
            default:
                if (Number.isNaN(Number(value.at(-1)))) {
                    value = value.slice(0, -1)
                }
        }
        setPages(value)
    }
    
    const checkAndPrint = () => {
        const _print: Print = {
            id: printer?.id ?? -1,
            pages: pages,
        }
        print(_print)
    }
    
    return (
        <>
            <h1
                style={{textAlign: "center", marginTop: "5px"}}
            >
                Печать
            </h1>
            <select
                className="printer-select"
                value={printer?.id ?? undefined}
                onChange={(e) => {
                    const id = e.currentTarget.value
                    setPrinter(printers?.find((item) => String(item.id) === id))
                }}
                style={{ width: "100%", marginBottom: "20px"}}
            >
                {!one && (<option value={undefined} disabled={true}>{
                    printers ? 
                    "Выберите принтер" :
                    "Принтеры не найдены"
                }</option>)}
                {printers?.map((printer) => (
                    <option key={printer.id} value={printer.id}>{printer.name}</option>
                ))}
            </select>
            <input
                className="printer-input"
                style={{ marginBottom: "40px", marginRight: "20px" }}
                type="file"
                accept=".pdf"
                onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                        await processFile(file)
                    }
                }}
            />
            {isError && (
                <span style={{ color: "#FF5266" }}>Не удалось отправить файл, повторите попытку</span>
            )}
            <fieldset
                className="pages-layout"
                disabled={!isSuccess || printersNotFound}
                style={{
                    border: "none",
                    padding: "0",
                    margin: "0 0 0"
                }}
            >
                <div className="pages-options" style={{ marginBottom: "40px" }}>
                    <label>
                        <input
                            type="radio"
                            name="pages"
                            style={{ marginRight: "10px" }}
                            defaultChecked
                            onChange={() => setAll(true)}
                        />
                            Все страницы
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="pages"
                            style={{ marginRight: "10px", opacity: pagesSelectionDisabled ? 0.45 : 1 }}
                            onChange={() => setAll(false)}
                            disabled={pagesSelectionDisabled}
                        />
                            Выбранные
                    </label>
                </div>
                <input
                    className="pages-range"
                    style={{ opacity: all ? 0.45 : 1 }}
                    type="text"
                    placeholder="Укажите номера страниц (например: 1–3, 5, 10)"
                    value={pages}
                    onChange={checkNumbersPages}
                    disabled={all}
                />
            </fieldset>
            <div>
                <button
                    style={{
                        right: "unset",
                        bottom: "unset",
                        backgroundColor: "#142B49",
                        border: "1px solid #40DFFF",
                    }}
                    disabled={!isSuccess || printersNotFound}
                    onClick={checkAndPrint}
                >
                    Печать
                </button>
            </div>
        </>
    )
}

export default PrinterPage