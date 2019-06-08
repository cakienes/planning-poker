import ISession from '../interfaces/ISession';

const LocalStorageService = {
    getSessions: (): ISession[] => {
        const linksString: string = localStorage.getItem('sessions') || '[]';
        return JSON.parse(linksString);
    },
    setSessions: (sessions: ISession[]): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            localStorage.setItem('sessions', JSON.stringify(sessions));
            resolve();
        });
    },
};

export default LocalStorageService;
