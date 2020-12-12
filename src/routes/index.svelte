<script>
  import { regSchema } from '../register/schema'

  let values = {}
  let errors = {}

  const extractErrors = (err) =>
    err.inner.reduce((acc, err) => {
      return { ...acc, [err.path]: err.message }
    }, {})

  const submitHandler = async () => {
    try {
      await regSchema.validate(values, { abortEarly: false })
      alert(JSON.stringify(values, null, 2))
      errors = {}
    } catch (err) {
      errors = extractErrors(err)
    }
  }
</script>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<div>
  <h1>Please register</h1>
  <form on:submit|preventDefault={submitHandler}>
    <div>
      <input
        type="text"
        name="name"
        bind:value={values.name}
        placeholder="Your name"
      />
      {errors.name ? errors.name : ''}
    </div>
    <div>
      <input
        type="text"
        name="email"
        bind:value={values.email}
        placeholder="Your email"
      />
      {#if errors.email}{errors.email}{/if}
    </div>
    <div>
      <input
        type="text"
        name="username"
        bind:value={values.username}
        placeholder="Choose username"
      />
      {#if errors.username}{errors.username}{/if}
    </div>
    <div>
      <input
        type="text"
        name="cnpj"
        bind:value={values.cnpj}
        placeholder="Your cnpj"
      />
      {#if errors.cnpj}{errors.cnpj}{/if}
    </div>
    <div>
      <input
        type="text"
        name="cnpj"
        bind:value={values.cpf}
        placeholder="Your cpf"
      />
      {#if errors.cpf}{errors.cpf}{/if}
    </div>
    <div>
      <input
        type="password"
        name="password"
        bind:value={values.password}
        placeholder="Password"
      />
      {#if errors.password}{errors.password}{/if}
    </div>
    <div>
      <input
        type="password"
        name="passwordConfirm"
        bind:value={values.passwordConfirm}
        placeholder="Confirm password"
      />
      {#if errors.passwordConfirm}{errors.passwordConfirm}{/if}
    </div>
    <div><button type="submit">Register</button></div>
  </form>
</div>

<style>
  h1 {
    text-align: center;
  }

  form {
    width: 30vw;
    margin: 0 auto;
  }

  form * + * {
    margin-top: 1em;
  }
  input,
  button {
    padding: 12px 24px;
    margin: 0 auto;
    width: 100%;
  }

  button {
    background-color: #0d6efd;
    color: white;
    font-weight: bold;
    font-size: 1rem;
  }

  div {
    width: 100%;
  }
</style>
