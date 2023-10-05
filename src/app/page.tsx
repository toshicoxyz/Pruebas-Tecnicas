/* eslint-disable @next/next/no-img-element */
'use client'

import TablePro from '@/components/TablePro'
import { Box, ThemeProvider, Typography, createTheme, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Ingrediente, ListasDeCompra, Menu, Receta } from '@/models/root';
import { useMemo, useState } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import CreateModal from '@/components/CreateModal';
import { useStateGlobal } from '@/context/useStateGlobal';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ChecklistIcon from '@mui/icons-material/Checklist';

export default function Home() {
  const app = useStateGlobal()
  const [openModalIngrediente, setOpenModalIngrediente] = useState<boolean>(false)
  const [openModalMenu, setOpenModalMenu] = useState<boolean>(false)
  const [openModalReceta, setOpenModalReceta] = useState<boolean>(false)
  const [openModalListasDeCompra, setOpenModalListasDeCompra] = useState<boolean>(false)
  const [section, setSection] = useState(0);


  const theme = createTheme({
    palette: {
      primary: {
        main: '#90caf9', // Color principal
      },
      secondary: {
        main: '#f48fb1', // Color secundario
      },
      mode: 'dark', // Habilita el tema oscuro (a partir de Material-UI v5)
    }
  })

  const columnIngrediente = useMemo<MRT_ColumnDef<Ingrediente>[]>(
    () => [
      // {
      //   accessorKey: 'id',
      //   header: 'Id',
      // },
      {
        accessorKey: 'nombre', //simple recommended way to define a column
        header: 'Nombre',
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              alt=" "
              height={30}
              src={"https://random.imagecdn.app/30/30" ?? row.original.foto}
              loading="lazy"
              style={{ borderRadius: '50%' }}
            />
            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: 'cantidad_disponible',
        header: 'Cantidad Disponible',
      },
    ],
    [],
  );

  const columnMenu = useMemo<MRT_ColumnDef<Menu>[]>(
    () => [
      {
        accessorKey: 'nombre', //simple recommended way to define a column
        header: 'Nombre',
      },
      {
        accessorKey: 'descripcion', //simple recommended way to define a column
        header: 'Descripcion',
      },
    ],
    [],
  );

  const columnRecetas = useMemo<MRT_ColumnDef<Receta>[]>(
    () => [
      {
        accessorKey: 'nombre', //simple recommended way to define a column
        header: 'Nombre',
      },
    ],
    [],
  );

  const columnListasDeCompra = useMemo<MRT_ColumnDef<ListasDeCompra>[]>(
    () => [
      {
        accessorKey: 'nombre', //simple recommended way to define a column
        header: 'Nombre',
      },
    ],
    [],
  );
  console.log(app.recetas)

  return (<ThemeProvider theme={theme}>
    <BottomNavigation
      sx={{ position: "fixed", width: "100vw", zIndex: 9999 }}
      showLabels
      value={section}
      onChange={(_, newValue) => {
        setSection(newValue);
      }}
    >
      <BottomNavigationAction label="Ingredientes" icon={<FastfoodIcon />} />
      <BottomNavigationAction label="Receta" icon={<MenuBookIcon />} />
      <BottomNavigationAction label="Menu" icon={<RestaurantIcon />} />
      <BottomNavigationAction label="Lista de Compra" icon={<ChecklistIcon />} />
    </BottomNavigation>
    <main className="p-2 pt-16 min-h-screen bg-slate-500">
      {section === 0 && <TablePro<Ingrediente>
        data={app.ingredientes}
        columns={columnIngrediente}
        onEditingRowSave={(e) => app.putIngrediente(e.values, e.row.original.id)}
        onEditingRowCancel={() => console.log("cancelado")}
        handleDelete={app.deleteIngrediente}
        title='Ingredientes'
        openModal={setOpenModalIngrediente}
      />}
      {section === 1 &&
        <TablePro<Receta>
          data={app.recetas}
          columns={columnRecetas}
          title='Recetas'
          openModal={setOpenModalReceta}
          handleDelete={app.deleteReceta}
          onEditingRowSave={(e) => app.putReceta(e.values, e.row.original.id)}
          onEditingRowCancel={() => console.log("cancelado")}
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <img
                alt="avatar"
                height={200}
                src={"https://random.imagecdn.app/200/200" ?? row.original.foto}
                loading="lazy"
                style={{ borderRadius: '50%' }}
              />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5">Ingredientes:</Typography>
                <Typography variant="body2">
                  {row.original.ingredientes ? row.original.ingredientes.map((item, index) => {
                    const ingrediente = app.getIdIngrediente(item)
                    return (
                      <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: 3 }}>
                        <img
                          alt="avatar"
                          height={30}
                          src={"https://random.imagecdn.app/30/30" ?? ingrediente?.foto}
                          loading="lazy"
                          style={{ borderRadius: '50%', marginRight: '10px' }}
                        />
                        <span>
                          {ingrediente?.nombre}
                        </span>
                        <span>
                          {ingrediente?.cantidad_disponible}
                        </span>
                      </li>
                    )
                  }) : <>No hay Ingredientes</>}
                </Typography>
                <Typography variant="h5">Intrucciones:</Typography>
                <Typography variant="body2">
                  &quot;{row.original.instrucciones}&quot;
                </Typography>
              </Box>
            </Box>
          )} />}

      {section === 2 &&
        <TablePro<Menu>
          data={app.menus}
          columns={columnMenu}
          title='Menus'
          openModal={setOpenModalMenu}
          handleDelete={app.deleteMenu}
          onEditingRowSave={(e) => app.putMenu(e.values, e.row.original.id)}
          onEditingRowCancel={() => console.log("cancelado")}
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              {/* <img
              alt="avatar"
              height={200}
              src={"https://random.imagecdn.app/200/200" ?? row.original.foto}
              loading="lazy"
              style={{ borderRadius: '50%' }}
            /> */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5">Platos:</Typography>
                <Typography variant="body2">
                  {row.original.platos ? row.original.platos.map((item, index) => {
                    const platos = app.getIdReceta(item.receta_id)
                    return (
                      <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          alt="avatar"
                          height={30}
                          src={"https://random.imagecdn.app/30/30" ?? platos?.foto}
                          loading="lazy"
                          style={{ borderRadius: '50%', marginRight: '10px' }}
                        />
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{platos?.nombre}</div>
                          <div>Porciones: {item.porciones}</div>
                          <ul style={{ listStyle: 'none', padding: 0 }}>
                            {platos?.ingredientes.map((ingredienteId, ingIndex) => {
                              const ingredienteInfo = app.getIdIngrediente(ingredienteId);
                              return (
                                <li key={ingIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                  <img
                                    alt="avatar"
                                    height={20}
                                    src={"https://random.imagecdn.app/20/20" ?? ingredienteInfo?.foto}
                                    loading="lazy"
                                    style={{ borderRadius: '50%', marginRight: '5px' }}
                                  />
                                  {ingredienteInfo?.nombre}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </li>
                    )
                  }) : <>No hay platos</>}
                </Typography>
              </Box>
            </Box>
          )}
        />}


      {section === 3 &&
        <TablePro<ListasDeCompra>
          data={app.listas_de_compra}
          columns={columnListasDeCompra}
          title='Lista de Compra'
          openModal={setOpenModalListasDeCompra}
          handleDelete={app.deleteListasDeCompra}
          onEditingRowSave={(e) => app.putListasDeCompra(e.values, e.row.original.id)}
          onEditingRowCancel={() => console.log("cancelado")}
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5">Items:</Typography>
                <Typography variant="body2">
                  {row.original.items ? row.original.items.map((item, index) => {
                    const ingrediente = app.getIdIngrediente(item.ingrediente_id)
                    return (
                      <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: 3 }}>
                        <img
                          alt="avatar"
                          height={30}
                          src={"https://random.imagecdn.app/30/30" ?? ingrediente?.foto}
                          loading="lazy"
                          style={{ borderRadius: '50%', marginRight: '10px' }}
                        />
                        <span>
                          {ingrediente?.nombre}, Cantidad: {item.cantidad}
                        </span>
                      </li>
                    )
                  }) : <>No hay Items</>}
                </Typography>
              </Box>
            </Box>
          )}
        />}

      <CreateModal<Ingrediente>
        columns={columnIngrediente}
        open={openModalIngrediente}
        onClose={() => setOpenModalIngrediente(false)}
        onSubmit={(e) => app.postIngrediente(e)}
      />
      <CreateModal<Menu>
        columns={columnMenu}
        open={openModalMenu}
        onClose={() => setOpenModalMenu(false)}
        onSubmit={(e) => app.postMenu(e)}
      />
      <CreateModal<Receta>
        columns={columnRecetas}
        open={openModalReceta}
        onClose={() => setOpenModalReceta(false)}
        onSubmit={(e) => app.postReceta(e)}
      />
      <CreateModal<ListasDeCompra>
        columns={columnListasDeCompra}
        open={openModalListasDeCompra}
        onClose={() => setOpenModalListasDeCompra(false)}
        onSubmit={(e) => app.postListasDeCompra(e)}
      />



    </main>
  </ThemeProvider>)
}
