import { Button, Chip } from "@mui/material";
import React from "react";
import { fromFetch } from 'rxjs/fetch';
import { concatMap, Observable } from 'rxjs';
import { useSubscriptions } from "./utils/useSubscriptions";

export interface MainPageProps {
    children?: React.ReactNode;
}

// const url = "https://house-plants.p.rapidapi.com/common/coralberry";
const plantUrl = "http://localhost:3000/api/plants/";
const reqInit: RequestInit = {
  method: "GET",
  mode: "cors",
  headers: {
    "X-RapidAPI-Key": process.env.PUBLIC_URL,
    "X-RapidAPI-Host": "house-plants.p.rapidapi.com"
  }
};

const getPlant: Observable<any> = fromFetch(plantUrl, reqInit)
  .pipe(concatMap((resp) => resp.json()));

export const MainPage: React.FC<MainPageProps> = () => {
  const addSubscription = useSubscriptions();
    const [message, setMessage] = React.useState("Hello World");

    const apiRequest = React.useCallback(() => {
      addSubscription(
        getPlant.subscribe((data) => {
          setMessage(data[0].latin);
        })
      );
    }, [addSubscription, setMessage]);


    return (
        <div>  
            <Chip label={message} />
            <Button onClick={apiRequest}>
          CLICK TO GET API
            </Button>
        </div>
    );
};

