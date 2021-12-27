import React from 'react'

const TableComponent = ({ data, header }) => {
    return (
        <div className="table-responsive m-4">
            <table className="table table-hover">
                <thead className='table-dark'>
                    <tr>
                        <th key="#">#</th>
                        {header.map(element => (
                            <th key={element.key}>{element.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{element.ap_mac}</td>
                                <td>{element.client_type}</td>
                                <td>{element.ip}</td>
                                <td>{element.user_mac}</td>
                                <td>{element.band}</td>
                                <td>{element.trafico_in}</td>
                                <td>{element.trafico_out}</td>
                                <td>{element.site}</td>
                                <td>{element.site_id}</td>
                                <td>{element.ap_group}</td>
                                <td>{element.nombre_sede}</td>
                                <td>{element.dda}</td>
                                <td>{element.estado_instalacion}</td>
                                <td>{element.ubicacion}</td>
                                <td>{element.cod_iso}</td>
                                <td>{element.tipo_sitio_desc}</td>
                                <td>{element.grupo}</td>
                                <td>{element.ip_wlan}</td>
                                <td>{element.mac_apoutdoor}</td>
                                <td>{element.nombre_departamento}</td>
                                <td>{element.municipio_pdet}</td>
                                <td>{element.ip_wan}</td>
                                <td>{element.banda_down}</td>
                                <td>{element.longitud}</td>
                                <td>{element.cod_dane_depar}</td>
                                <td>{element.nombre_institucion_ed}</td>
                                <td>{element.cod_dane_sede}</td>
                                <td>{element.energia_desc}</td>
                                <td>{element.cod_servicio}</td>
                                <td>{element.ip_prod_1}</td>
                                <td>{element.detalle_sitio}</td>
                                <td>{element.id_beneficiario}</td>
                                <td>{element.ip_prod_2}</td>
                                <td>{element.detalle_sitio_desc}</td>
                                <td>{element.latitud}</td>
                                <td>{element.grupo_instalacion}</td>
                                <td>{element.energia}</td>
                                <td>{element.operador_cod}</td>
                                <td>{element.cod_centro_poblado}</td>
                                <td>{element.mac_2apoutdoor}</td>
                                <td>{element.mac_indoor}</td>
                                <td>{element.tipo_sitio}</td>
                                <td>{element.cod_dane_muni}</td>
                                <td>{element.nombre_centro_pob}</td>
                                <td>{element.banda_up}</td>
                                <td>{element.matricula}</td>
                                <td>{element.grupo_desc}</td>
                                <td>{element.region}</td>
                                <td>{element.nombre_municipio}</td>
                                <td>{element.cod_dane_institucion_edu}</td>
                                <td>{element.timestamp}</td>
                                <td>{element.ancho_banda_carga}</td>
                                <td>{element.ancho_banda_descarga}</td>
                                <td>{element.consumo}</td>
                                <td>{element.concurrenciaConexiones}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent
