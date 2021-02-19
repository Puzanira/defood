export const mapToArray = object =>
    Object.entries(object).map(([key, value]) => (
        { key, value }
    ));

export const mapToObject = array =>
    array.reduce((acc, cur) => {
        acc[cur.key] = cur.value;
        return acc;
    }, {});

export const withMappedParametersToObject = ({ deal }) =>
    ({ ...deal, parameters: mapToObject(deal.parameters) });

export const withMappedParametersToArray = ({ deal }) =>
    ({ ...deal, parameters: mapToArray(deal.parameters) });
