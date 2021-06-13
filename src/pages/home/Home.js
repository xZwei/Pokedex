import React, {useEffect, useState} from 'react';
import { Container, createStyles, withStyles } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import withRoot from "../../withRoot";
import { getAllPokemon } from "../../data/pokemonDb";
import { getPokemonTypeImages } from "../../data/pokemonTypeImages";

const styles = (theme) => createStyles({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        marginRight: theme.spacing(0.5),
        marginLeft: theme.spacing(0.5),
    },
    table: {
        position: "relative",
        boxShadow: "3px 3px 9px 0px #444",
        zIndex: 10
    },
    tableHead: {
        color: "#FFF"
    },
    tableContainer: {
        overflowX: "initial"
    }
});

function Home(props) {
    const { classes } = props;
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        let data = getAllPokemon();
        setPokemonData(data);
    }, []);

    const createImageElements = (urls) => {
        //NOTE: 
        // Normally an alt attribute would be the name of the type
        // (which would change this implementation slightly) but not needed for a code challenge, imo 
        return urls.map(url => <img alt="pokemon type" className={classes.image} src={url} />);
    }

    return (
        <Container>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table stickyHeader className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" className={classes.tableHead}>Name</TableCell>
                            <TableCell align="right" className={classes.tableHead}>Num</TableCell>
                            <TableCell align="right" className={classes.tableHead}>Type</TableCell>
                            <TableCell align="right" className={classes.tableHead}>Weaknesses</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pokemonData && pokemonData.map((pokemon) => {
                            const pokemonTypeImageUrls = getPokemonTypeImages(pokemon.type);
                            const pokemonWeaknessImageUrls = getPokemonTypeImages(pokemon.weaknesses);

                            return (
                                <TableRow key={pokemon.num}>
                                    <TableCell align="right">{pokemon.name}</TableCell>
                                    <TableCell align="right">{pokemon.num}</TableCell>
                                    <TableCell align="right">{createImageElements(pokemonTypeImageUrls)}</TableCell>
                                    <TableCell align="right">{createImageElements(pokemonWeaknessImageUrls)}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default withRoot(withStyles(styles)(Home));