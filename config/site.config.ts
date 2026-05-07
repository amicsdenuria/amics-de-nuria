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
};

type DataSourceOption = 'local' | 'sanity';

interface DataSource {
  rutesItineraris: {
    regions: DataSourceOption;
    pois: DataSourceOption;
    stages: DataSourceOption;
    routes: DataSourceOption;
  };
  agenda: {
    activities: DataSourceOption;
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
  },
  agenda: {
    activities: 'local',
  },
  publicacions: {
    publications: 'local',
  },
};
