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
import Q7PopularPokemonLookup from './components/Q7PopularPokemonLookup';
import Q8MultiGenerationPokemonLookup from './components/Q8MultiGenerationPokemonLookup';
import Q9PokemonTypePopularity from './components/Q9PokemonTypePopularity';
import Q10MoveTypePopularity from './components/Q10MoveTypePopularity';
import QEXRawTableLookup from './components/QEXRawTableLookup';

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
                            <Tab eventKey="q5" title="Encounter Lookup by Pokemon">
                                <Q5PokemonEcounterLookup/>
                            </Tab>
                            <Tab eventKey="q6" title="Encounter Lookup by Location">
                                <Q6LocationPokemonLookup/>
                            </Tab>
                            <Tab eventKey="q2" title="Pokemon Moves by Ailment">
                                <Q2MoveAilmentLookup/>
                            </Tab>
                            <Tab eventKey="q3" title="Pokemon Moves by Stat">
                                <Q3MoveStatChangeLookup/>
                            </Tab>
                            <Tab eventKey="q4" title="Effective Moves">
                                <Q4EffectiveMoveLookup/>
                            </Tab>
                            <Tab eventKey="q7" title="Pokemon Encounter Rarity">
                                <Q7PopularPokemonLookup/>
                            </Tab>
                            <Tab eventKey="q8" title="Pokemon Alt. Generations">
                                <Q8MultiGenerationPokemonLookup/>
                            </Tab>
                            <Tab eventKey="q9" title="Pokemon Type Popularity">
                                <Q9PokemonTypePopularity/>
                            </Tab>
                            <Tab eventKey="q10" title="Move Type Popularity">
                                <Q10MoveTypePopularity/>
                            </Tab>
                            <Tab eventKey="qex" title="Raw Tables">
                                <QEXRawTableLookup/>
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