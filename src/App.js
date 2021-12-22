import './App.css';
import React from 'react';
import * as sql from './SqlApi';
import Q1PokedexLookup from './components/Q1PokedexLookup';
import { Container, Navbar, Tabs, Tab } from 'react-bootstrap';
import Q2MoveAilmentLookup from './components/Q2MoveAilmentLookup';
import Q3MoveStatChangeLookup from './components/Q3MoveStatChangeLookup';
import Q4EffectiveMoveLookup from './components/Q4EffectiveMoveLookup';
import Q5PokemonEcounterLookup from './components/Q5PokemonEcounterLookup';
import Q6LocationPokemonLookup from './components/Q6LocationPokemonLookup';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            init: false
        }

        sql.initSqlite().then(() => {
            window.sql = sql;
            this.setState({init: true});
        });
    }

    

    render() {
        if (this.state.init) {
            return (
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand>PokeQuery</Navbar.Brand>
                    </Navbar>
                    <Container>
                        <Tabs defaultActiveKey="q1">
                            <Tab eventKey="q1" title="Pokedex Lookup">
                                <Q1PokedexLookup/>
                            </Tab>
                            <Tab eventKey="q2" title="Pokemon Move Ailment Lookup">
                                <Q2MoveAilmentLookup/>
                            </Tab>
                            <Tab eventKey="q3" title="Pokemon Move Stat Lookup">
                                <Q3MoveStatChangeLookup/>
                            </Tab>
                            <Tab eventKey="q4" title="Effective Move Lookup">
                                <Q4EffectiveMoveLookup/>
                            </Tab>
                            <Tab eventKey="q5" title="Pokemon Encounters Lookup">
                                <Q5PokemonEcounterLookup/>
                            </Tab>
                            <Tab eventKey="q6" title="Location Encounters Lookup">
                                <Q6LocationPokemonLookup/>
                            </Tab>
                        </Tabs>
                    </Container>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <p>Please wait while we load the database...</p>
                </div>
            );
        }
    }
}