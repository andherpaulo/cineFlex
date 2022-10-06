import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../components/Input/Input";
import LoadingPage from "../LoadingPage/LoadingPage";
import * as S from "./style";

function SeatsPage() {
    const [seats, setSeats] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const { idSession } = useParams();

    const seatColor = (seat) => {
        if (selectedSeats.includes(Number(seat.name))) return "GREEN";
        if (seat.isAvailable) return "GREY";
        return "YELLOW";
    };

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`;

        axios
            .get(URL)
            .then((res) => {
                setSeats(res.data.seats);
                console.log(res.data.seats);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [idSession]);

    if (seats === null) {
        return <LoadingPage />;
    }

    return (
        <S.StyledSeatsPage>
            <h2>Selecione o(s) assento(s)</h2>
            <S.SessionMap>
                {seats.map((seat) => (
                    <S.Seat key={seat.id} color={seatColor(seat)}>
                        <p>{seat.name}</p>
                    </S.Seat>
                ))}
            </S.SessionMap>
            <S.SeatsLabel>
                <S.LabelDescription>
                    <S.Seat color={"GREEN"}></S.Seat>
                    <p>Selecionado</p>
                </S.LabelDescription>
                <S.LabelDescription>
                    <S.Seat color={"GREY"}></S.Seat>
                    <p>Disponível</p>
                </S.LabelDescription>
                <S.LabelDescription>
                    <S.Seat color={"YELLOW"}></S.Seat>
                    <p>Indisponível</p>
                </S.LabelDescription>
            </S.SeatsLabel>
            <Input
                description="Nome do comprador"
                placeholder="Digite seu nome..."
            />
            <Input
                description="CPF do comprador"
                placeholder="Digite seu CPF..."
            />
            <button>Reservar assento(s)</button>
        </S.StyledSeatsPage>
    );
}

export default SeatsPage;