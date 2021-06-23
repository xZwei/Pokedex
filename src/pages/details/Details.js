import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, createStyles, withStyles, Paper} from "@material-ui/core";
import { Link } from "react-router-dom";
import withRoot from "../../withRoot";
import { getPokemonById } from "../../data/pokemonDb";

const styles = (theme) => createStyles({});

function Details(props) {
    const { id } = props.match.params;
    const [pokemonData, setPokemonData] = useState(undefined);

    useEffect(() => {
        let pokemon = getPokemonById(id);
        setPokemonData(pokemon);
    // eslint-disable-next-line
    }, []);

    return (
        <Container component={Paper}>
            {pokemonData !== undefined && 
                <Grid container>
                    <Grid item xs={12}>
                        <Grid item xs={6}>
                            <Typography>Name</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{pokemonData.name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={6}>
                            <Typography>Number</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{pokemonData.num}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={6}>
                            <Typography>image</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                <img src={pokemonData.img} alt={pokemonData.name} />
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={6}>
                            <Typography>Type</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{pokemonData.type}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={6}>
                            <Typography>Weaknesses</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{pokemonData.weaknesses}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={6}>
                            <Typography>Height</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{pokemonData.height}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={6}>
                            <Typography>Weight</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{pokemonData.weight}</Typography>
                        </Grid>
                    </Grid>
                    {pokemonData.prev_evolution &&
                        <Grid item xs={12}>
                            <Grid item xs={6}>
                                <Typography>Previous Evolution</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {pokemonData.prev_evolution.forEach(evolution => {
                                    <Typography>
                                        <Link to={`/details/${evolution.num}`}>
                                            {evolution.name}
                                        </Link>
                                    </Typography>
                                })}
                            </Grid>
                        </Grid>
                    }
                    {pokemonData.next_evolution &&
                        <Grid item xs={12}>
                            <Grid item xs={6}>
                                <Typography>Next Evolution</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {pokemonData.next_evolution.forEach(evolution => {
                                    <Typography>
                                        <Link to={`/details/${evolution.num}`}>
                                            {evolution.name}
                                        </Link>
                                    </Typography>
                                })}
                            </Grid>
                        </Grid>
                    }
                </Grid>
            }
        </Container>
    )
};
export default withRoot(withStyles(styles)(Details));