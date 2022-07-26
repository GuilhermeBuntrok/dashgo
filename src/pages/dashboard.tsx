import dynamic from "next/dynamic";
import { Box, Flex, Text, theme } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";

import { SimpleGrid } from '@chakra-ui/react'
import { Header } from "../components/Header";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
})


//função para formatar data
function formatDateDayMonth(date: Date) {
  const [first, ...rest] = date.toLocaleString('pt-BR', { month: "short" }).split('')

  return date.getDay().toString().padStart(2, '0') + ' ' + first.toUpperCase() + rest.slice(0, -1).join('')
}

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTick: {
      color: theme.colors.gray[600],
    },
    categories: [

      new Date("2022-03-23T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" }),
      new Date("2022-03-24T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" }),
      new Date("2022-03-25T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" }),
      new Date("2022-03-26T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" }),
      new Date("2022-03-27T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" }),
      new Date("2022-03-28T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" }),
      new Date("2022-03-29T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" })
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    }
  }
};

const series = [
  { name: "series1", data: [10, 40, 30, 50, 80, 60] }
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" >
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4" >Inscritos da semana</Text>
            <Chart type="area" options={options} series={series} height={160} />
          </Box>
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4" >Taxa de abertura</Text>
            <Chart type="area" options={options} series={series} height={160} />
          </Box>
        </SimpleGrid>

      </Flex>

    </Flex>
  )
}