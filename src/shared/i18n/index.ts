import LanguageDetector from 'i18next-browser-languagedetector';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          authorization: 'Authorization',
          login: 'Login',
          signIn: 'sign in',
          management: 'Management',
          users: 'Users',
          createuser: 'Create User',
          datasets: 'Data Sets',
          hostusers: 'Host Users',
          vdbs: 'Virtual DBs',
          createvdb: 'Create Virtual DB',
          createhostuser: 'Create Host User',
          environments: 'Environments',
          createdbhost: 'Create DB Host',
          logs: 'Logs',
          logout: 'Logout',
          create: 'Create',
          edit: 'Edit',
          bybackup: 'By Backup',
          byrepl: 'By Replication',
          createvdbsnapshotform: {
            defaultplaceholder: 'Type here',
            snapshotname: {
              label: 'Snapshot Name',
            },
          },
          createvdbform: {
            defaultplaceholder: 'Type here',
            vdbname: {
              label: 'Virtual DB Name',
              empty: 'The name must be filled in!'
            },
            host: {
              label: 'Server',
              hint: 'Select server',
              empty: 'You must select a server!'
            },
            dbport: {
              label: 'DB Port',
              empty: 'The database port needs to be filled!',
            },
            dataset: {
              label: 'Data set',
              hint: 'Select data set',
              empty: 'You must select a dataset!'
            },
            snapshot: {
              label: 'Snapshot',
              hint: 'Select a snapshot',
              empty: 'You must select a snapshot!'
            },
            user: {
              label: 'User',
              hint: 'Select user',
              empty: 'You must select a user!'
            }
          },
          createuserform: {
            defaultplaceholder: 'Type here',
            login: {
              label: 'Login',
              empty: 'You must fill out your login!'
            },
            password: {
              label: 'Password',
              empty: 'You must fill out your password!'
            },
            email: {
              label: 'E-mail',
              hint: '',
              empty: 'You must fill out your email!'
            },
            fullname: {
              label: 'Full Name',
              hint: '',
              empty: 'You must fill out your fullname!'
            },
            type: {
              label: 'Type',
              hint: 'Pick user type',
              variants: {
                admin: 'Admin',
                user: 'User',
                monitor: 'Monitoring',
              },
              empty: 'You must fill out your type user!'
            },
          },
          createhostuserform: {
            defaultplaceholder: 'Type here',
            login: {
              label: 'Login',
              empty: 'You must fill in your login!'
            },
            password: {
              label: 'Password',
              empty: 'Password required!'
            },
            description: {
              label: 'Description',
              hint: '',
              empty: 'Description required!'
            },
            sshkey: {
              label: 'SSH Key',
              hint: '',
              empty: 'You need to fill in the SSH key!'
            },
            sudo: {
              label: 'Sudo',
            },
          },
          createdbhostform: {
            defaultplaceholder: 'Type here',
            hostname: {
              label: 'Host Name',
              empty: 'Hostname required!'
            },
            hostdesc: {
              label: 'Host Description',
              empty: 'You must fill in the host description!'
            },
            sshport: {
              label: 'SSH Port',
              hint: '',
              empty: 'You need to fill in the SSH Port!'
            },
            dbpath: {
              label: 'DB Path',
              hint: '',
              empty: 'The path to the database must be filled in!'
            },
            dbport: {
              label: 'DB Port',
              empty: 'The database port needs to be filled!'
            },
            dbtype: {
              label: 'DB Type',
              hint: 'Pick DB type',
              empty: 'You must select a database type!'
            },
            dbosuser: { label: 'DB OS User', empty: 'Need to fill in system database users!' },
            hostuser: { label: 'Host user', hint: 'Pick host user', empty: 'You must select a host user!' },
            isvirtual: { label: 'Is Virtual' },
          },
          createdataset: 'Create Data Set',
          createdatasetbybcpform: {
            defaultplaceholder: 'Type here',
            dsname: {
              label: 'Name',
              empty: 'The name must be filled in!'
            },
            srchost: {
              hint: 'Select source',
              label: 'Source',
              empty: 'You must select a source!'
            },
            description: {
              label: 'Description',
              empty: 'Description required!'
            },
            remotepath: {
              label: 'Path to backup files',
              empty: 'The path needs to be filled!'
            },
            tablespaceid: {
              label: 'Tablespace ID',
              empty: 'Identifier must be filled in!'
            },
          },
          createdatasetbyreplform: {
            defaultplaceholder: 'Type here',
            dsname: {
              label: 'Name',
              empty: 'The name must be filled in!'
            },
            dbport: {
              label: 'DB Port',
              empty: 'The DB Port needs to be filled!'
            },
            description: {
              label: 'Description',
              empty: 'Description required!'
            },
            srchost: {
              hint: 'Select source',
              label: 'Source',
              empty: 'You must select a source!'
            },
            repluser: {
              label: 'User',
              empty: 'Your username must be filled in!'
            },
            repluserpwd: {
              label: 'Password',
              empty: 'User password must be filled in!'
            },
          },

          "errormessage": {
            "requiredField": "Field required"
          },
        },
      },
      ru: {
        translation: {
          authorization: 'Авторизация',
          login: 'Войти',
          signIn: 'Вход',
          management: 'Управление',
          users: 'Пользователи',
          createuser: 'Создать пользователя',
          datasets: 'Наборы данных',
          hostusers: 'Хост-пользователи',
          vdbs: 'Виртуальные БД',
          createvdb: 'Создать виртуальную БД',
          createhostuser: 'Создать хост-пользователя',
          environments: 'Окружение',
          createdbhost: 'Создать хост базы данных',
          logs: 'Журнал',
          logout: 'Выйти',
          create: 'Создать',
          edit: 'Изменить',
          bybackup: 'Из резервной копии',
          byrepl: 'С помощью репликации',
          createvdbsnapshotform: {
            defaultplaceholder: 'Введите здесь',
            snapshotname: {
              label: 'Имя снимка',
            },
          },
          createvdbform: {
            defaultplaceholder: 'Введите здесь',
            vdbname: {
              label: 'Наименование',
              empty: 'Необходимо заполнить наименование!'
            },
            host: {
              label: 'Сервер',
              hint: 'Выберите сервер',
              empty: 'Необходимо выбрать сервер!'
            },
            dbport: {
              label: 'Порт БД',
              empty: 'Необходимо заполнить порт БД!'
            },
            dataset: {
              label: 'Набор данных',
              hint: 'Выберите набор данных',
              empty: 'Необходимо выбрать набор данных!'
            },
            snapshot: {
              label: 'Снимок',
              hint: 'Выберите снимок',
              empty: 'Необходимо выбрать снимок!'
            },
            user: {
              label: 'Пользователь',
              hint: 'Выберите пользователя',
              empty: 'Необходимо выбрать пользователя!'
            }
          },
          createuserform: {
            defaultplaceholder: 'Введите здесь',
            login: {
              label: 'Логин',
              empty: 'Необходимо заполнить логин!'
            },
            password: {
              label: 'Пароль',
              empty: 'Необходимо заполнить пароль!'
            },
            email: {
              label: 'Эл. почта',
              hint: '',
              empty: 'Необходимо заполнить почту!'
            },
            fullname: {
              label: 'Полное имя',
              hint: '',
              empty: 'Необходимо заполнить полное имя!'
            },
            type: {
              label: 'Тип',
              hint: 'Выберите тип пользователя',
              variants: {
                admin: 'Администратор',
                user: 'Пользователь',
                monitor: 'Мониторинг',
              },
              empty: 'Необходимо выбрать тип пользователя!'
            },

          },
          createhostuserform: {
            defaultplaceholder: 'Введите здесь',
            login: {
              label: 'Логин',
              empty: 'Необходимо заполнить логин!'
            },
            password: {
              label: 'Пароль',
              empty: 'Необходимо заполнить пароль!'
            },
            description: {
              label: 'Описание',
              hint: '',
              empty: 'Необходимо заполнить описание!'
            },
            sshkey: {
              label: 'SSH Ключ',
              hint: '',
              empty: 'Необходимо заполнить SSH ключ!'
            },
            sudo: {
              label: 'Sudo',
            },
          },
          createdbhostform: {
            defaultplaceholder: 'Введите здесь',
            hostname: {
              label: 'Имя хоста',
              empty: 'Необходимо заполнить имя хоста!'
            },
            hostdesc: {
              label: 'Описание хоста',
              empty: 'Необходимо заполнить описание хоста!'
            },
            sshport: {
              label: 'SSH Порт',
              hint: '',
              empty: 'Необходимо заполнить SSH Порт!'
            },
            dbpath: {
              label: 'Путь к базе даннх',
              hint: '',
              empty: 'Необходимо заполнить путь к БД!'
            },
            dbport: {
              label: 'Порт базы данных',
              empty: 'Необходимо заполнить порт БД!'
            },
            dbtype: {
              label: 'Тип базы данных',
              hint: 'Выберите тип базы данных',
              empty: 'Необходимо выбрать тип БД!'
            },
            dbosuser: { label: 'Системных пользователь базы данных', empty: 'Необходимо заполнить системных пользователей БД!' },

            hostuser: {
              label: 'Хост-пользователь',
              hint: 'Выберите хост-пользователя',
              empty: 'Необходимо выбрать хост-пользователя!'
            },
            isvirtual: { label: 'Виртуальный' },
          },
          createdataset: 'Создать набор данных',
          createdatasetbybcpform: {
            defaultplaceholder: 'Введите здесь',
            dsname: {
              label: 'Наименование',
              empty: 'Необходимо заполнить наименование!'
            },
            srchost: {
              hint: 'Выберите источник',
              label: 'Источник',
              empty: 'Необходимо выбрать источник!'
            },
            description: {
              label: 'Описание',
              empty: 'Необходимо заполнить описание!'
            },
            remotepath: {
              label: 'Путь к файлам резервной копии',
              empty: 'Необходимо заполнить путь!'
            },
            tablespaceid: {
              label: 'Идентификатор табличного пространства',
              empty: 'Необходимо заполнить идентификатор!'
            },
          },
          createdatasetbyreplform: {
            defaultplaceholder: 'Введите здесь',
            dsname: {
              label: 'Наименование',
              empty: 'Необходимо заполнить наименование!'
            },
            dbport: {
              label: 'Порт БД',
              empty: 'Необходимо заполнить Порт БД!'
            },
            description: {
              label: 'Описание',
              empty: 'Необходимо заполнить описание!'
            },
            srchost: {
              hint: 'Выберите источник',
              label: 'Источник',
              empty: 'Необходимо выбрать источник!'
            },
            repluser: {
              label: 'Пользователь',
              empty: 'Необходимо заполнить логин пользователя!'
            },
            repluserpwd: {
              label: 'Пароль',
              empty: 'Необходимо заполнить пароль пользователя!'
            },
          },

        },
      },
    },
  });
