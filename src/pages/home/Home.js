import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Container, createStyles, Grid, withStyles } from "@material-ui/core";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import withRoot from "../../withRoot";
import { getAllPokemon } from "../../data/pokemonDb";
import { getPokemonTypeImages, createTypeImageElements, pokemonTypes } from "../../data/pokemonTypeDb";

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
    },
    searchInput: {
        margin: "10px 10px 10px 0px",
        color: "#eee"
    },
    searchLabel: {
        color: '#eee'
    },
    searchInputText: {
        color: "#eee"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Home(props) {
    const { classes } = props;
    const [pokemonData, setPokemonData] = useState(undefined)
    const [searchValue, setSearchValue] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedWeaknesses, setSelectedWeaknesses] = useState([]);

    const filterPokemonData = (pokemon) => pokemon.name.toLowerCase().includes(searchValue.toLowerCase())

    const filterForTypes = (pokemon) => {
        const {type} = pokemon;

        if(selectedTypes.length < 1) return true;

        let result = true;
        selectedTypes.forEach(selectedType => {
            if(!type.includes(selectedType)) result = false;
        });

        return result;
    }

    const filterForWeaknesses = (pokemon) => {
        const {weaknesses} = pokemon;

        if(selectedWeaknesses.length < 1) return true;

        let result = true;
        selectedWeaknesses.forEach(selectedWeakness => {
            if(!weaknesses.includes(selectedWeakness)) result = false;
        });

        return result;
    }

    const onSelectedTypesChange = (e) => {
        setSelectedTypes(e.target.value)
    }

    const onSelectedWeaknessesChange = (e) => {
        setSelectedWeaknesses(e.target.value);
    }

    useEffect(() => {
        let data = getAllPokemon();
        setPokemonData(data);
    }, []);

    return (
        <Container>
            <Grid container>
                <Grid item xs={4}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Search" 
                            color="secondary"
                            variant="filled"
                            value={searchValue}
                            onChange={({target}) => setSearchValue(target.value)}
                            className={classes.searchInput}
                            InputProps={{className: classes.searchInputText}} 
                            InputLabelProps={{className: classes.searchLabel}}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="types-input-label">Types</InputLabel>
                        <Select 
                            value={selectedTypes}
                            onChange={onSelectedTypesChange}
                            multiple
                            input={<Input />}
                            MenuProps={MenuProps}
                            labelId="types-input-label"
                        >
                            {pokemonTypes.map(type => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="weaknesses-input-label">Weaknesses</InputLabel>
                        <Select 
                            value={selectedWeaknesses}
                            onChange={onSelectedWeaknessesChange}
                            multiple
                            input={<Input />}
                            MenuProps={MenuProps}
                            labelId="weaknesses-input-label"
                        >
                            {pokemonTypes.map(type => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
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
                        {pokemonData && 
                            pokemonData
                                .filter(filterPokemonData)
                                .filter(filterForTypes)
                                .filter(filterForWeaknesses)
                                .map((pokemon) => {
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
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default withRoot(withStyles(styles)(Home));