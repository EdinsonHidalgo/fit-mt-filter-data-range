import React from 'react'
import Title from '../form/title'
import DataFilter from './components/data-filter'

const HomeView = () => {
  return (
    <div>
      <Title text='Filtro de Datos'></Title>
      <DataFilter></DataFilter>
    </div>
  )
}

export default HomeView

