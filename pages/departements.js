import React, { useState } from 'react';
import { Layout } from '../components/layout';
import axios from 'axios';
import Head from "next/head";

const Departement = ({data}) => {
  const [searchValue, setSearchValue] = useState("")

  const styles = {
    container: {

    },
    searchBar: {
      display: 'flex',
      margin: 'auto'
    },
    departements: {
      padding: 10,
      margin: 10,
      borderBottom: "1px solid #DDD"
    }
  }

  const handleChange = (e) => {
    e.preventDefault();

    setSearchValue(e.target.value)
  }

  console.log("searchValue", searchValue);

  const filteredDepartements = data.filter(departement => 
    departement.nom.toLowerCase().includes(searchValue.toLowerCase())  
  )

  return (
    <>
      <Head>
        <title>Liste des départements</title>
      </Head>
      <Layout>
        <div style={styles.container}>
          {/* <h1>Cette page utilise getInitialProps</h1> */}
          <input onChange={handleChange} value={searchValue} style={styles.searchBar} type='search' />
          {filteredDepartements.map(departement => (
            <div style={styles.departements} key={departement.code}>
              <h1>{departement.nom}</h1>
              <div>
                Code du département : {departement.code}
              </div>
              <div>
                Code de la région : {departement.codeRegion}
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async() => {
  const url = "https://geo.api.gouv.fr/departements";
  const { data } = await axios.get(url);

  return { props: { data } }
}

export default Departement;