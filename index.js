const fs = require('fs')
const inquirer = require('inquirer');
const ignore = `node_modules`;

inquirer.prompt([
  {
    type: 'input',
    message: 'What is your Projects Title?',
    name: 'name'
  },
  {
    type: 'input',
    message: 'What is your project about?',
    name: 'description'
  },
  {
    type: 'input',
    message: 'Installation instructions',
    name: 'installation'
  },
  {
    type: 'input',
    message: 'Usage information',
    name: 'usage'
  },
  {
    type: 'input',
    message: 'Contributions guidelines',
    name: 'contributions'
  },
  {
    type: 'input',
    message: 'testing instructions',
    name: 'testing',
  },
  {
    type: 'list',
    message: 'What Licenses would you like?',
    name: 'license',
    choices: ['MIT', 'Mozilla', 'Perl', 'Apache']
  },
  {
    type: 'input',
    message: 'What is your Github User?',
    name: 'github'
  },
  {
    type: 'input',
    message: 'What is your Email?',
    name: 'email'
  },
  {
    type: 'confirm',
    name: 'gitignore',
    message: 'Would you like a .gitignore file included?'
  },
])
  .then((response) =>
    createPage(response));

    //takes all information given and puts onto page
function createPage(response) {
  readMe = `# ${response.name} 
  
## Table of Contents.
- [Description.](#description)

- [Installation instructions.](#installation-instructions)

- [Usage information.](#usage-information)

- [Test instructions.](#test-instructions)

## Description. 

${response.description}.

## Installation Instructions.

${response.installation}

## Usage information.

${response.usage}

## Test Instructions.

${response.testing}

## License.

${licenseResponse(response.license)}

# Contact Me / Questions.

### ${response.github}

### ${response.email}
`;
//
  fs.writeFile('README.md', readMe, (err) =>
    err ? console.error(err) : console.log('README created'));
  if (response.gitignore) {
    fs.writeFile('.gitignore', ignore, (err) =>
      err ? console.error(err) : console.log('.gitignore added'));
  }
};

// sends the correct license to the page depending what user selects
function licenseResponse(license) {
  const licenseMit = `
  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

  MIT License terms
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  `;

  const licenseMpl2 = `MPL2 warranty license
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)


Covered Software is provided under this License on an “as is” basis, without warranty of any kind, either expressed, implied, or statutory, including, without limitation, warranties that the Covered Software is free of defects, merchantable, fit for a particular purpose or non-infringing. The entire risk as to the quality and performance of the Covered Software is with You. Should any Covered Software prove defective in any respect, You (not any Contributor) assume the cost of any necessary servicing, repair, or correction. This disclaimer of warranty constitutes an essential part of this License. No use of any Covered Software is authorized under this License except under this disclaimer.`;

  const licensePerl = `Pearl license info
[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)


(14) Disclaimer of Warranty: THE PACKAGE IS PROVIDED BY THE COPYRIGHT HOLDER AND CONTRIBUTORS “AS IS’ AND WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES. THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT ARE DISCLAIMED TO THE EXTENT PERMITTED BY YOUR LOCAL LAW. UNLESS REQUIRED BY LAW, NO COPYRIGHT HOLDER OR CONTRIBUTOR WILL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING IN ANY WAY OUT OF THE USE OF THE PACKAGE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE`;
  const licenseApache = `Apache 2.0 
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.`;
  if (license === 'MIT') {
    return licenseMit;
  } else if (license === 'Mozilla') {
    return licenseMpl2;
  } else if (license === 'Perl') {
    return licensePerl;
  } else {
    return licenseApache;
  }
};