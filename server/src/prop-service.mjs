import db from './db.mjs';

const BASE_URL = "https://sportsbook.draftkings.com//sites/US-SB/api/v5/";
const EVENT_GROUP = 42648
const CATEGORIES = {
    playerPoints: 1215,
    playerRebounds: 1216,
    playerAssists: 1217
}
const SUB_CATEGORIES = {
    pointsOu: 12488,
    reboundsOu: 12492,
    assistsOu: 12495
}

const checkHttpResponseForError = response => response.status < 200 || response.status >= 300;

const fetchOffers = group => category => async subcategory => {
    const response = await fetch(`${BASE_URL}eventgroups/${group}/categories/${category}/subcategories/${subcategory}?format=json`);
    if (checkHttpResponseForError(response)) {
        return {
            status: response.status,
            message: response.statusText
        }
    }
    const data = await response.json();
    const eventGroup = data.eventGroup;
    if (!eventGroup) {
        return [];
    }
    const offerCategories = eventGroup.offerCategories ? eventGroup.offerCategories : [];
    const offerFiltered = offerCategories.filter(offerCategory => offerCategory.offerCategoryId === category);
    const subcategoryDescriptors = offerFiltered[0].offerSubcategoryDescriptors ? offerFiltered[0].offerSubcategoryDescriptors : [];
    const offerSubcategory = subcategoryDescriptors.filter(sc => sc.subcategoryId === subcategory)[0];
    const offers = offerSubcategory.offerSubcategory.offers;

    const result = [];
    for (const offerGroup of offers) {
        for (const offer of offerGroup) {
            const outcomes = offer.outcomes;
            const gameId = offer.eventId;
            const propCategory = offerSubcategory.name.toUpperCase();
            for (const outcome of outcomes) {
                const propId = outcome.providerOutcomeId;
                const participants = outcome.participants;
                const playerId = participants[0].id;
                const propLine = outcome.line;
                const propOu = outcome.label === "Over";
    
                result.push({
                   propId,
                   playerId,
                   gameId,
                   propCategory,
                   propLine,
                   propOu 
                });
            }
        }
    }

    return result;
}

const fetchNba = fetchOffers(EVENT_GROUP);
const fetchPlayerPoints = () => fetchNba(CATEGORIES.playerPoints)(SUB_CATEGORIES.pointsOu);
const fetchPlayerRebounds = () => fetchNba(CATEGORIES.playerRebounds)(SUB_CATEGORIES.reboundsOu);
const fetchPlayerAssists = () => fetchNba(CATEGORIES.playerAssists)(SUB_CATEGORIES.assistsOu);

const updateDb = async () => {
    const playerPoints = await fetchPlayerPoints();
    const playerAssists = await fetchPlayerAssists();
    const playerRebounds = await fetchPlayerRebounds();
    const allProps = [...playerPoints, ...playerAssists, ...playerRebounds];

    const numWildcards = allProps.length;
    const wildcards = Array(numWildcards - 1).fill('?,').join(' ').trim() + " ?";
    const sql = `SELECT * FROM prop WHERE prop_id IN (${wildcards});`;
    db.connect(error => console.log(error));
    const query = db.query({sql, values: allProps}, (error, results, fields) => {
        results
    });
    query.start();
}

export default updateDb;