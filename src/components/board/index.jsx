import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Toolbar,
  Typography,
  Chip,
} from "@mui/material";

import tecboardLogo from "../../assets/tecboard.svg";
import bannerImage from "../../assets/banner.png";

import { useForm, Controller } from "react-hook-form";
import { eventSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "@emotion/styled";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ChipEstilizado = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.textSecondary,
}));

export const Board = () => {
  const queryClient = useQueryClient();

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(eventSchema),
  });

  const [page, setPage] = useState(1);

  async function getEvents(page = 1) {
    const res = await fetch(
      `https://6a105526d2a985707036a9b1.mockapi.io/tech-board-events?page=${page}&limit=6`,
    );
    if (!res.ok) {
      throw new Error("Erro ao buscar eventos");
    }
    return res.json();
  }

  const {
    data: eventsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getEvents", page],
    queryFn: () => getEvents(page),
  });

  async function postEvents(event) {
    const response = await fetch(
      "https://6a105526d2a985707036a9b1.mockapi.io/tech-board-events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      },
    );

    return response.json();
  }

  const postEventMutation = useMutation({
    mutationKey: ["postEvents"],
    mutationFn: postEvents,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getEvents"],
      });
    },
  });

  function handleOnSubmit(data) {
    postEventMutation.mutate({
      ...data,
      image: "https://placehold.co/236x282",
    });

    console.log(data);
  }

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#06151A" }}>
      {/* Header */}
      <AppBar position="static" sx={{ py: 2, backgroundColor: "#06151A" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <img src={tecboardLogo} alt="Logo" style={{ height: "28px" }} />
        </Toolbar>
      </AppBar>

      {/* Seção de Banner */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          height: "600px",
          background: "linear-gradient(180deg, #17D9B1 0%, #06151A 100%)",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <img src={bannerImage} />

          <Typography
            variant="h1"
            component="h1"
            sx={{
              position: "absolute",
              bottom: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "652px",
              textAlign: "center",
            }}
          >
            Seu hub de eventos de tecnologia
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#06151A",
          py: 8,
        }}
      >
        {/* Formulário */}
        <Box
          component="form"
          onSubmit={handleSubmit(handleOnSubmit)}
          sx={{
            backgroundColor: "#212121",
            width: "100%",
            maxWidth: "384px",
            py: "32px",
            px: "28px",
            borderRadius: 2,
          }}
        >
          <Typography>Preencha para criar um evento:</Typography>

          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel
                shrink
                htmlFor="name"
                sx={{
                  position: "static",
                  transform: "none",
                  mb: 1,
                }}
              >
                Qual o nome do evento?
              </InputLabel>

              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <OutlinedInput
                    id="name"
                    placeholder="Summer dev hits"
                    fullWidth
                    sx={{ height: "36px" }}
                    {...field}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel
                shrink
                htmlFor="date"
                sx={{
                  position: "static",
                  transform: "none",
                  mb: 1,
                }}
              >
                Data do evento
              </InputLabel>

              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <OutlinedInput
                    id="date"
                    placeholder="XX/XX/XXXX"
                    fullWidth
                    sx={{ height: "36px" }}
                    {...field}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel
                shrink
                htmlFor="theme"
                sx={{
                  position: "static",
                  transform: "none",
                  mb: 1,
                }}
              >
                Tema do evento
              </InputLabel>

              <Controller
                control={control}
                name="theme"
                render={({ field }) => (
                  <Select
                    id="theme"
                    {...field}
                    defaultValue=""
                    displayEmpty
                    fullWidth
                    sx={{ height: "36px" }}
                  >
                    <MenuItem value="" disabled>
                      Selecione uma opção
                    </MenuItem>

                    <MenuItem value="Front-end">Front-end</MenuItem>

                    <MenuItem value="Design">Design</MenuItem>

                    <MenuItem value="Back-end">Back-end</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <Button type="submit" sx={{ alignSelf: "center" }}>
              Criar evento
            </Button>
          </Stack>
        </Box>

        {/* Lista de eventos */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "1200px",
            mt: "60px",
            gap: "64px",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }} j>
            <Button
              onClick={() => {
                setPage((currentPage) => currentPage - 1);
              }}
              disabled={page === 1}
            >
              Página anterior
            </Button>
            <Button
              disabled={eventsData.length < 6}
              onClick={() => {
                setPage((currentPage) => currentPage + 1);
              }}
            >
              Próxima página
            </Button>
          </Box>
          {isError && <Typography>Deu ruim</Typography>}

          {isLoading && <Typography>Ta carregando</Typography>}

          <Grid container spacing={3} sx={{ maxWidth: "1200px", mx: "auto" }}>
            {!isError &&
              !isLoading &&
              eventsData.map((event) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
                  <Card sx={{ width: "282px" }}>
                    <CardMedia
                      component="img"
                      height="236px"
                      image={event.image}
                      alt={event.name}
                    />

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        py: 3,
                        px: 2,
                        backgroundColor: "#212121",
                      }}
                    >
                      <ChipEstilizado label={event.theme} />

                      <Typography>{event.date}</Typography>

                      <Typography>{event.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
