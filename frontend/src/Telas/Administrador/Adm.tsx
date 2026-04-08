import  HeaderPaginaAdministrador  from "./HeaderPaginaAdministrador/Header";
import { HeaderTabelaClientePaginaAdm } from "./TabelaClientePaginaAdministrador/HeaderTabelaClientePaginaAdm";

export default function PaginaAdministrador(){
    return(
        <>
        <HeaderPaginaAdministrador/>
        <HeaderTabelaClientePaginaAdm />
        </>
    )
}