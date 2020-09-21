export const normalizeAttribute = (attr: string) => {
    switch (attr) {
        case 'str':
            return {
                name: 'Strength',
                color: '#ec3d06',
                icon: `${process.env.PUBLIC_URL}/images/heroes/attributes/hero_icon_str.png`,
            }
        case 'int':
            return {
                name: 'Intelligence',
                color: '#00c9e5',
                icon: `${process.env.PUBLIC_URL}/images/heroes/attributes/hero_icon_int.png`,
            }
        case 'agi':
            return {
                name: 'Agility',
                color: '#26e030',
                icon: `${process.env.PUBLIC_URL}/images/heroes/attributes/hero_icon_agi.png`,
            }
    }
}
