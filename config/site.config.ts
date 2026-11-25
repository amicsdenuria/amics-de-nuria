export const site = {
  name: {
    long: 'Amics de Núria',
    short: 'AdNúria',
  },
  hero: {
    title: 'Esperit, Natura i País', // exemple: Amics de Núria: Esperit, Natura i País
    description:
      'Una comunitat que uneix espiritualitat, natura i identitat per mantenir viva la història, la fe i el vincle amb Núria i amb el país.',
  },
  contact: {
    phone: {
      countryCode: '34',
      nationalNumber: '607 93 41 11',
    },
    whatsappMessage: 'Hola! Us escric des del web d’Amics de Núria.',
  },
};

type DataSourceOption = 'local' | 'sanity';

interface DataSource {
  rutesItineraris: {
    regions: DataSourceOption;
    pois: DataSourceOption;
    stages: DataSourceOption;
    routes: DataSourceOption;
    currentRoute: DataSourceOption;
  };
  agenda: {
    activities: DataSourceOption;
    featuredActivity: DataSourceOption;
    currentSpiritActivity: DataSourceOption;
  };
  publicacions: {
    publications: DataSourceOption;
  };
}

export const dataSource: DataSource = {
  rutesItineraris: {
    regions: 'sanity',
    pois: 'sanity',
    stages: 'sanity',
    routes: 'sanity',
    currentRoute: 'sanity',
  },
  agenda: {
    activities: 'sanity',
    featuredActivity: 'sanity',
    currentSpiritActivity: 'sanity',
  },
  publicacions: {
    publications: 'local',
  },
};
