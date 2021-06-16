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
import { getPokemonTypeImages, createTypeImageElements } from "../../data/pokemonTypeImages";
import { Link } from 'react-router-dom';

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

    return (
        <Container>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table stickyHeader className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.tableHead}>Name</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="center" className={classes.tableHead}>Num</TableCell>
                            <TableCell align="center" className={classes.tableHead}>Type</TableCell>
                            <TableCell align="center" className={classes.tableHead}>Weaknesses</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pokemonData && pokemonData.map((pokemon) => {
                            const pokemonTypeImageUrls = getPokemonTypeImages(pokemon.type);
                            const pokemonWeaknessImageUrls = getPokemonTypeImages(pokemon.weaknesses);

                            return (
                                <TableRow key={pokemon.num}>
                                    <TableCell align="center">
                                        <Link to={`/details/${pokemon.num}`}>
                                            {pokemon.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">
                                        <img src={pokemon.img} alt={pokemon.name} />
                                    </TableCell>
                                    <TableCell align="center">{pokemon.num}</TableCell>
                                    <TableCell align="center">{createTypeImageElements(pokemonTypeImageUrls, classes)}</TableCell>
                                    <TableCell align="center">{createTypeImageElements(pokemonWeaknessImageUrls, classes)}</TableCell>
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