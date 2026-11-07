import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import printer, { type IPrinter, type IPrint } from "../components/printer/printer.tsx";

export const printerApi = createApi({
    reducerPath: 'printerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${printer.url}`,
    }),
    tagTypes: ['Printer'],
    endpoints: (builder) => ({
        getPrinters: builder.query<Array<IPrinter>, void>({
            query: () => "",
            providesTags: ["Printer"],
        }),

        processFile: builder.mutation<number, File>({
            query: (file: File) => ({
                url: `/file`,
                method: "POST",
                body: file,
            }),
        }),

        print: builder.mutation<void, IPrint>({
            query: (print: IPrint) => ({
                url: `/print`,
                method: "POST",
                body: print,
            }),
        })
    })
})

export const { 
    useGetPrintersQuery,
    useProcessFileMutation,
    usePrintMutation,
} = printerApi