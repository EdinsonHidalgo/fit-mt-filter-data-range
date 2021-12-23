import React, {useState} from 'react'
import Title from '../form/title'
import DataFilter from '../form/data-filter'
import DataDownload from '../form/data-download'

const HomeView = () => {
  const [start_date, set_start_date] = useState('');
  const [end_date, set_end_date] = useState('');

  return (
    <div>
      <Title text='Filtro de Datos'></Title>
      <DataFilter toStartDate={set_start_date} toEndDate={set_end_date}></DataFilter>
      <br />
      <DataDownload start_date={start_date} end_date={end_date}></DataDownload>
    </div>
  )
}

export default HomeView

