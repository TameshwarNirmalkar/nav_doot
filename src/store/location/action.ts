import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllLocationAction = createAsyncThunk("GET_ALL_LOCATION", async () => {
  try {
    // const res = await fetch(`/location`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then((res) => res.json());
    // return res.data.map((country: any) => ({
    //   ...country,
    //   _id: country.iso2,
    // }));
    return [
      {
        id: "fdsf34234sfds",
        city_name: "Bhilai",
        city_code: 57981,
        country_name: "India",
        country_code: 101,
        postal_code: "490024",
        state_name: "Chhattisgarh",
        state_code: 4040,
        zone_code: "EST",
        zone_name: "East",
        created_date: new Date().toLocaleDateString("en-GB"),
        updated_date: new Date().toLocaleDateString("en-GB"),
      },
      {
        id: "fdsf342d432",
        city_name: "Durg",
        city_code: 131801,
        country_name: "India",
        country_code: 101,
        postal_code: "490023",
        state_name: "Chhattisgarh",
        state_code: 4040,
        zone_code: "WST",
        zone_name: "West",
        created_date: new Date().toLocaleDateString("en-GB"),
        updated_date: new Date().toLocaleDateString("en-GB"),
      },
    ];
  } catch (error: any) {
    return error;
  }
});

export const addLocationAction = createAsyncThunk<any[], any>("ADD_LOCATION", async (args: any) => {
  try {
    // const res = await fetch(`/location`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(args),
    // }).then((res) => res.json());
    // return res.data.map((el: string) => ({ label: el, value: el }));
    return args;
  } catch (error: any) {
    return error;
  }
});
