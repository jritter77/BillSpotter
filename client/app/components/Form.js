// fields consist of objects {label, type, style}

/** Form Component
 *
 *
 * @returns {JQuery} - Form Element
 */

const Form = () => {
  const form = $("<form></form>").css(formStyle);

  return form;
};

/** Form Group
 *
 * @param {JQuery} label - Label Element
 * @param {JQuery} input - Input Element/s
 * @param {JQuery} feedback - Feedback Element
 * @returns {JQuery} - FormGroup Element
 */

const FormGroup = (label, input, feedback) => {
  const group = $("<div></div>").css(groupStyle);

  group.append(label, input, feedback);

  return group;
};

/** Form Label Element
 *
 * @param {String} label - Label element text
 * @returns {JQuery} - FormLabel element
 */

const FormLabel = (label) => {
  return $("<label></label>").text(label).css(labelStyle);
};

const FormInput = (type = "text") => {
  return $("<input>").attr("type", type).css(inputStyle);
};

const FormRadio = (name, value) => {
  return $("<input>")
    .attr("type", "radio")
    .attr("name", name)
    .val(value)
    .css(radioStyle);
};

/** Form Radio Group
 *
 * @param {String} groupname - Name used to group radio buttons
 * @param {Array<Object>} options - Array of options for button group ex: [{label, value}, ...]
 * @returns {Object} - Object that holds all radio buttons in group according to label.
 */

const FormRadioGroup = (groupname, options) => {
  let group = {};

  for (let option of options) {
    group[option.label] = FormRadio(groupname, option.value);
  }

  return group;
};

/** Form Select Element
 *
 * @param {Array<String>} options - Select options
 * @returns {JQuery} - FormSelet element
 */

const FormSelect = (options) => {
  const select = $("<select></select>").css(selectStyle);

  for (let option of options) {
    let op = $(`<option></option>`).val(option).text(option);
    select.append(op);
  }

  return select;
};

/** Invalid Feedback Element
 *
 * @returns {JQuery} - Feedback element
 */

const InvalidFeedback = () => {
  return $("<p></p>").css(feedbackStyle);
};

const FormSubmit = (text, submit) => {
  const btn = $("<button></button>").text(text).css(submitStyle);

  btn.click((e) => {
    e.preventDefault();
    submit();
  });

  return btn;
};

/** Create Fields Function
 *
 * Creates and populates an object which holds all form fields.
 *
 * FIELD DEFINITIONS:
 * radio - {label, type, groupname, options}
 * select - {label, type, options}
 * other - {label, type}
 *
 * @param {Array<Object>} fields - An array of objects that define field type.
 * @returns {Object} - Object which holds all fields {fieldLabel: {label, input, feedback, group}, ...}
 */

function createFields(fields) {
  let formFields = {};

  for (let field of fields) {
    let label = FormLabel(field.label);
    let feedback = InvalidFeedback();
    let input;
    let group;

    // Create proper input and group type
    if (field.type === "select") {
      input = FormSelect(field.options);
      group = FormGroup(label, input, feedback);
    } else if (field.type === "radio") {
      input = FormRadioGroup(field.groupname, field.options);
      let elements = $("<div></div>").css(radioGroupStyle);

      for (let label in input) {
        elements.append(
          $("<label></label").append(input[label], label).css(radioLabelStyle)
        );
      }

      group = FormGroup(label, elements, feedback);
    } else {
      input = FormInput(field.type);
      group = FormGroup(label, input, feedback);
    }

    // Adjust style if date picker
    if (field.type === "date") {
      input.css(dateStyle);
    }

    // Set field according to label
    formFields[field.label] = { label, input, feedback, group };
  }

  return formFields;
}

const formStyle = {
  padding: "5%",
  display: "flex",
  "flex-direction": "column",
  "min-height": "20vh",
  "justify-content": "space-between",
  "align-items": "center",
};

const groupStyle = {
  display: "flex",
  "flex-direction": "column",
  "align-items": "center",
  flex: 1,
};

const labelStyle = {
  "font-weight": "bold",
  "font-size": "var(--md-font-size)",
  "margin-bottom": "5%",
};

const inputStyle = {
  padding: "5%",
  "border-radius": "25px",
  "font-size": "var(--md-font-size)",
  width: "80%",
};

const selectStyle = {
  padding: "5%",
  "border-radius": "25px",
  "font-size": "var(--md-font-size)",
  width: "80%",
};

const radioStyle = {
  width: "var(--sm-font-size)",
  height: "var(--sm-font-size)",
};

const radioLabelStyle = {
  "font-size": "var(--sm-font-size)",
};

const radioGroupStyle = {
  display: "flex",
  "flex-direction": "column",
};

const dateStyle = {
  "font-size": "var(--sm-font-size)",
};

const feedbackStyle = {
  color: "red",
  "font-size": "var(--sm-font-size)",
};

const submitStyle = {
  background: "black",
  color: "white",
  "border-radius": "25px",
  padding: "5% 10%",
  "font-size": "var(--xl-font-size)",
};

export {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormSubmit,
  FormSelect,
  FormRadio,
  FormRadioGroup,
  InvalidFeedback,
  createFields,
};
