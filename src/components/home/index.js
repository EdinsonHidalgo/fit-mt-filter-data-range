import React from 'react'
import Title from '../form/title'
import DataFilter from '../form/data-filter'
import DataDownload from '../form/data-download'

const HomeView = () => {
  return (
    <div>
      <Title text='Filtro de Datos'></Title>
      <DataFilter></DataFilter>
      <br />
      <DataDownload></DataDownload>
    </div>
  )
}

export default HomeView

