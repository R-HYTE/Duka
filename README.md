# Duka: One App to help you retail

## Introduction

Our goal? To digitize the operations of local shops, starting with the foundational aspects of the project. For a detailed account of the journey behind Duka, check out the article on [Medium](https://medium.com/@polycarpwathuta39/the-journey-of-building-duka-93c2e2865d75).


- **Deployed Site**:\
![QR Code](./app/static/images/qr.png)
- **Deployed Site**: [Explore Duka](https://r-hyte.github.io/Duka/)
- **Author's LinkedIn**: [Polycarp Kanyugo](https://www.linkedin.com/in/polycarp-kanyugo)

## Installation

Getting started with Duka is a breeze:
Open your terminal/ CLI:

1. **Pull docker image**:
   ```bash
   docker pull wathuta/duka:latest
   ```

2. **Run a container from the image(above)**:
   ```bash
   docker run --name duka -d -p 5000:5000 wathuta/duka:latest
   ```

To stop the container from running

**Stop the running app**:
   ```bash
   docker stop duka
   ```

## Contributing

Interested? Let's do it. Here's how you can jump in:

1. **Fork the repository**.
2. **Create a new branch** (e.g., `feature-branch`).
3. **Make your changes**.
4. **Commit your changes** (e.g., `git commit -m 'Add new feature'`).
5. **Push to the branch** (e.g., `git push origin feature-branch`).
6. **Create a new Pull Request**.

Stay tuned as we continue to update and expand Duka as part of a larger project. More exciting features are on the horizon!