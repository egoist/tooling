// as long as the CLI options are enough for you
// you don't have to modify this file, see doc at:
// https://github.com/egoist/tooling#advanced-configuration

export default options => {
  return {
    title: "<$ projectName $>",
    entry: ['index.js'],<% if react %>
    react: true,<% endif %>
  }
}
