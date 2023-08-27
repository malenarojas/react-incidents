/* eslint-disable */
import {
  Button,
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem,
  useColorModeValue,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { AndroidLogo, AppleLogo, WindowsLogo } from 'components/icons/Icons';
import Menu from 'components/menu/MainMenu';
import Mapa from 'views/incidencias/incidencias/components/Detalle/Mapa';
import React, { useMemo, useRef } from 'react';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import locale from 'date-fns/locale';
import { es } from 'date-fns/locale';
import { useDownloadExcel } from 'react-export-table-to-excel';

export default function DevelopmentTable(props) {
  const { columnsData, tableData, handleDetalleIncidenciaClick } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const tableRef = useRef(null);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const iconColor = useColorModeValue('secondaryGray.500', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Tabla Incidencias',
    sheet: 'Incidencias',
  });

  const handleExportToExcel = () => {
    onDownload();
  };

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Lista de incidencias
        </Text>
        <Menu handleExportToExcel={handleExportToExcel} />
      </Flex>
      <Table
        ref={tableRef}
        {...getTableProps()}
        variant="simple"
        color="gray.500"
        mb="24px"
      >
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color="gray.400"
                  >
                    {column.render('Header')}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = '';
                  if (cell.column.id === 'idIncidencia') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.id === 'descripcion') {
                    data = (
                      <Text
                        noOfLines={3}
                        color={textColor}
                        fontSize="sm"
                        fontWeight="500"
                      >
                        {/* {cell.value.slice(0,50)}... */}
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.id === 'procedimiento') {
                    data = (
                      <Text
                        noOfLines={3}
                        color={textColor}
                        fontSize="sm"
                        fontWeight="500"
                      >
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.id === 'estado') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="500">
                        {/* {cell.value} */}
                        Creada
                      </Text>
                    );
                  } else if (cell.column.id === 'categoria') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="500">
                        {cell.value.nombre}
                        {/* {row.values} */}
                        {/* {row.values.categoria.descripcion} */}
                      </Text>
                    );
                  } else if (cell.column.id === 'tipo') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="500">
                        {cell.value.descripcion}
                      </Text>
                    );
                  } else if (cell.column.id === 'createdAt') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="500">
                        {/* {formatRelative(
                          subDays(new Date(cell.value), 3),
                          new Date(cell.value),
                          {
                            locale: es,
                          }
                        )} */}
                        {format(new Date(cell.value), 'yyyy/MM/dd HH:mm')}
                      </Text>
                    );
                  } else if (cell.column.id === 'opciones') {
                    data = (
                      <Wrap spacing={4}>
                        <WrapItem>
                          <Button
                            colorScheme="telegram"
                            onClick={() =>
                              handleDetalleIncidenciaClick(
                                row.values.idIncidencia
                              )
                            }
                          >
                            Detalle
                          </Button>
                          {/* <Link
                            to={`/incidencias/incidencias/${row.values.idIncidencia}`}
                            // onClick={handleDetalleIncidenciaClick}
                          > */}
                          {/* Detalle
                          </Link> */}
                        </WrapItem>
                       
                      </Wrap>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
