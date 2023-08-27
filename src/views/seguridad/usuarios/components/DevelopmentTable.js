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
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { AndroidLogo, AppleLogo, WindowsLogo } from 'components/icons/Icons';
import Menu from 'components/menu/MainMenu';
import React, { useMemo } from 'react';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

export default function DevelopmentTable(props) {
  
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

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
          Lista de usuarios
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
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
                  if (cell.column.id === 'idUsuario') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.id === 'nombres') {
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
                  } else if (cell.column.id === 'apellidos') {
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
                  } else if (cell.column.id === 'ci') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="500">
                        {cell.value}
                      </Text>
                    );
                  }else if (cell.column.id === 'rol') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="500">
                        {cell.value.nombre}
                      </Text>
                    );
                  }else if (cell.column.id === 'telefono') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="500">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.id === 'opciones') {
                    data = (
                      <Wrap spacing={4}>
                        <WrapItem>
                          <Button colorScheme="telegram">Detalle</Button>
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
