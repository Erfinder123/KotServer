import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import printer, { type Printer, type Print } from "../components/printer/printer.tsx";

export const printerApi = createApi({
    reducerPath: 'printerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${printer.url}`,
    }),
    tagTypes: ['Printer'],
    endpoints: (builder) => ({
        getPrinters: builder.query<Array<Printer>, void>({
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

        print: builder.mutation<void, Print>({
            query: (print: Print) => ({
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