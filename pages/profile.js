import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout';
import Link from 'next/link';
import axios from "axios";
import useSWR from "swr";
import Head from "next/head";

const Profile = () => {
  // **** CLIENT SIDE RENDERING ****
  // const [data, setData] = useState("")

  const url = "https://jsonplaceholder.typicode.com/users";

  // **** SERVER SIDE RENDERING ****
  const fetcher = url => axios.get(url).then(res => res.data);
  const {data, error} = useSWR(url, fetcher)

  if(!data) return <h1>Chargement ...</h1>

  if(error) return <h1>Une erreur est survenue</h1>

  const styles = {
    padding: 10,
    margin: 10,
    borderBottom: '1px solid #DDD'
  }

  // **** CLIENT SIDE RENDERING ****
  // useEffect(() => {
  //   axios.get(url)
  //        .then(response => {
  //          setData(response.data)
  //        })
  //        .catch(error => {
  //          console.log(error)
  //        })
  // }, [])

  return (
    <>
      <Head>
        <title>Liste des utilisateurs</title>
      </Head>
      <Layout>
        {/* <h1>Cette page utilise Le rendu côté client</h1> */}
        {
          data && data.map(profile => (
            <div style={styles} key={profile.id}>
              <h1>{profile.name}</h1>
              <div>Email : {profile.email}</div>
              <div>Téléphone : {profile.phone}</div>
            </div>
          ))
        }
      </Layout>
    </>
  )
}


export default Profile;