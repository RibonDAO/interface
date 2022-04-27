// eslint-disable-next-line @typescript-eslint/no-var-requires
const {scopes, directoriesInPath} = require("./helpers");

module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "application component",

    // inquirer prompts
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name?",
      },
      {
        type: "list",
        name: "componentType",
        message: "atomic or molecular?",
        choices: ["atomic", "molecular"],
        filter(val) {
          return `${val.toLowerCase()}s`
        },
      },
      {
        type: "input",
        name: "scope",
        message: "scope? (empty for no scope)",
        filter(val) {
          if(!val) return null;

          return `/${val.toLowerCase()}`
        },
      },
    ],

    // actions to perform
    actions: [
      {
        type: "add",
        path: "../src/components/{{componentType}}{{scope}}/{{pascalCase name}}/index.tsx",
        templateFile: "templates/index.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{componentType}}{{scope}}/{{pascalCase name}}/styles.ts",
        templateFile: "templates/styles.ts.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{componentType}}{{scope}}/{{pascalCase name}}/index.stories.tsx",
        templateFile: "templates/index.stories.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{componentType}}{{scope}}/{{pascalCase name}}/index.test.tsx",
        templateFile: "templates/index.test.tsx.hbs",
      },
    ],
  });

  plop.setGenerator("page", {
    description: "application page",

    // inquirer prompts
    prompts: [
      {
        type: "input",
        name: "name",
        message: "page name?",
      },
      {
        type: "input",
        name: "scope",
        message: "scope? (empty for no scope)",
        filter(val) {
          if(!val) return null;

          return `/${val.toLowerCase()}`
        },
      },
    ],

    // actions to perform
    actions: [
      {
        type: "add",
        path: "../src/pages{{scope}}/{{pascalCase name}}Page/index.tsx",
        templateFile: "templates/page.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/pages{{scope}}/{{pascalCase name}}Page/styles.ts",
        templateFile: "templates/styles.ts.hbs",
      },
      {
        type: "add",
        path: "../src/pages{{scope}}/{{pascalCase name}}Page/index.test.tsx",
        templateFile: "templates/index.test.tsx.hbs",
      },
    ],
  });

  plop.setGenerator("page component", {
    description: "application page component",

    // inquirer prompts
    prompts: [
      {
        type: "list",
        choices: scopes(),
        name: "pageScope",
        message: "page scope?",

      },
      {
        type: "list",
        choices: (answers) => {
          const pathToSearch = `../src/pages/${answers.pageScope}/`;
          return directoriesInPath(pathToSearch);
        },
        name: "page",
        message: "page name?",

      },
      {
        type: "input",
        name: "name",
        message: "component name?",
      },
    ],

    // actions to perform
    actions: [
      {
        type: "add",
        path: "../src/pages/{{pageScope}}/{{pascalCase page}}/{{pascalCase name}}/index.tsx",
        templateFile: "templates/index.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/pages/{{pageScope}}/{{pascalCase page}}/{{pascalCase name}}/styles.ts",
        templateFile: "templates/styles.ts.hbs",
      },
      {
        type: "add",
        path:
          "../src/pages/{{pageScope}}/{{pascalCase page}}/{{pascalCase name}}/index.test.tsx",
        templateFile: "templates/index.test.tsx.hbs",
      },
    ],
  });

  plop.setGenerator("page component within a folder", {
    description: "application page component",

    // inquirer prompts
    prompts: [
      {
        type: "input",
        name: "folder",
        message: "folder name?",
      },
      {
        type: "input",
        name: "page",
        message: "page name?",
      },

      {
        type: "input",
        name: "name",
        message: "component name?",
      },
    ],

    // actions to perform
    actions: [
      {
        type: "add",
        path: "../src/pages/{{camelCase folder}}/{{pascalCase page}}/{{pascalCase name}}/index.tsx",
        templateFile: "templates/index.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/pages/{{camelCase folder}}/{{pascalCase page}}/{{pascalCase name}}/styles.ts",
        templateFile: "templates/styles.ts.hbs",
      },
      {
        type: "add",
        path:
          "../src/pages/{{camelCase folder}}/{{pascalCase page}}/{{pascalCase name}}/index.test.tsx",
        templateFile: "templates/index.test.tsx.hbs",
      },
    ],
  });

  plop.setGenerator("service API", {
    description: "application service API",

    // inquirer prompts
    prompts: [
      {
        type: "input",
        name: "name",
        message: "service name?",
      },
    ],

    // actions to perform
    actions: [
      {
        type: "add",
        path: "../src/services/api/{{camelCase name}}Api/index.ts",
        templateFile: "templates/serviceAPI.ts.hbs",
      },
      {
        type: "add",
        path: "../src/services/api/{{camelCase name}}Api/index.test.ts",
        templateFile: "templates/serviceAPI.test.ts.hbs",
      },
    ],
  });

  plop.setGenerator("Factory", {
    description: "application factory",

    // inquirer prompts
    prompts: [
      {
        type: "input",
        name: "name",
        message: "factory name?",
      },
    ],

    // actions to perform
    actions: [
      {
        type: "add",
        path: "../src/config/testUtils/factories/{{camelCase name}}Factory.ts",
        templateFile: "templates/factory.ts.hbs",
      },
    ],
  });
  plop.setGenerator("Context", {
    description: "application context",

    // inquirer prompts
    prompts: [
      {
        type: "input",
        name: "name",
        message: "context name?",
      },
    ],

    // actions to perform
    actions: [
      {
        type: "add",
        path: "../src/contexts/{{camelCase name}}Context/index.tsx",
        templateFile: "templates/context.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/contexts/{{camelCase name}}Context/index.test.tsx",
        templateFile: "templates/context.test.tsx.hbs",
      },
    ],
  });
};
