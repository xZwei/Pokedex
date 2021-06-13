const baseSerebiiTypeImageUrl = "https://www.serebii.net/pokedex-bw/type/"

const typeImages = {
    Bug: baseSerebiiTypeImageUrl + "bug.gif",
    Dark: baseSerebiiTypeImageUrl + "dark.gif",
    Dragon: baseSerebiiTypeImageUrl + "dragon.gif",
    Electric: baseSerebiiTypeImageUrl + "electric.gif",
    Fairy: baseSerebiiTypeImageUrl + "fairy.gif",
    Fighting: baseSerebiiTypeImageUrl + "fighting.gif",
    Fire: baseSerebiiTypeImageUrl + "fire.gif",
    Flying: baseSerebiiTypeImageUrl + "flying.gif",
    Ghost: baseSerebiiTypeImageUrl + "ghost.gif",
    Grass: baseSerebiiTypeImageUrl + "grass.gif",
    Ground: baseSerebiiTypeImageUrl + "ground.gif",
    Ice: baseSerebiiTypeImageUrl + "ice.gif",
    Normal: baseSerebiiTypeImageUrl + "normal.gif",
    Psychic:baseSerebiiTypeImageUrl + "psychic.gif",
    Poison: baseSerebiiTypeImageUrl + "poison.gif",
    Rock: baseSerebiiTypeImageUrl + "rock.gif",
    Steel: baseSerebiiTypeImageUrl + "steel.gif",
    Water: baseSerebiiTypeImageUrl + "water.gif"
}

export const getPokemonTypeImages = (types) => {
    let images = [];
    types.forEach(type => {
        images.push(typeImages[type]);
    });
    return images;
};