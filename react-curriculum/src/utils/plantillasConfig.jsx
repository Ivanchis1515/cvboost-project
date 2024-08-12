//añadir aqui las plantillas dinamicamente
export const templates = {
    CurriculumV: {
        component: () => import('../components/common/PlantillasCV/CurriculumV'),
        name: 'CurriculumV'
    },
    CurriculumV2: {
        component: () => import('../components/common/PlantillasCV/CurriculumV2'),
        name: 'CurriculumV2'
    }
};