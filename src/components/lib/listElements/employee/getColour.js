function getColour(salary) {
    if (salary <   60_000) return 'hsla(267, 35%, 16.66%  ,1)';
    if (salary <   90_000) return 'hsla(267, 35%, 33.33%  ,1)';
    if (salary <  120_000) return 'hsla(267, 35%, 50%     ,1)';
    if (salary <  160_000) return 'hsla(267, 35%, 66.66%  ,1)';
    if (salary <  200_000) return 'hsla(267, 35%, 83.33%  ,1)';
    if (salary >= 200_000) return 'hsla(267, 35%, 100%    ,1)';
    return 'hsl(0,0%,50%,1)';
}

export default getColour;