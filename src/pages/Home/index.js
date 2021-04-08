import React from 'react';
import {PageArea, SearchArea} from './styled';
import {Link} from 'react-router-dom';

import {PageContainer} from '../../components/MainComponents';
import { useState, useEffect } from 'react';
import useApi from '../../helpers/api';

const Page = () => {

    const api = useApi();
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(()=>{ // executa quando a pagina é carregada
        const getStates = async () =>{
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);


    useEffect(()=>{ // executa quando a pagina é carregada
        const getCategories = async () =>{
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    return(
        <>  <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action ="/ads">
                            <input type="text" name="q" placeholder="O que você procura?" />
                            <select name="state">
                                <option></option>
                                {stateList.map((i, k)=>   
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="categoryList">
                        {categories.map((i, k)=>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                                <img src={i.img} alt="" />
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    ...
                </PageArea>
            </PageContainer>
        </>
    );
}

export default Page;