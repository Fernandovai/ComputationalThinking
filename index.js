function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function viajar_aviao(clima, distancia_origem_destino, altitude) {
  velocidade_media = 130;
  razao_subida = 500;

  voo_liberado = true;

  switch (clima) {
    case "nublado":
    case "tesoura_vento":
    case "tempestade":
      voo_liberado = false;
      break;
    default:
      voo_liberado = true;
  }

  if (voo_liberado) {
    console.log(
      "Atenção Sr. passageiros, percorreremos " +
        distancia_origem_destino +
        "NM. Boa viagem."
    );

    await sleep(1000);

    console.log("Iniciando subida...");

    altitude_atual = 0;
    while (altitude_atual <= altitude) {
      console.log("Altitude " + altitude_atual + "ft...");
      altitude_atual = altitude_atual + razao_subida;
      await sleep(1000);
    }
    console.log("Atingimos nosso nível de voo...");

    qtd_checkpoints = Math.round(distancia_origem_destino / velocidade_media);

    checkpoint_atual = 0;

    // Criando o percurso
    percurso = "I";
    unidade_percurso = "     ";

    for (i = 0; i < qtd_checkpoints; i++) {
      percurso = percurso + unidade_percurso;
    }
    percurso += "F";
    // Fim percurso

    // Navegacao
    distancia_percorrida = 0;

    do {
      if (checkpoint_atual == 0) {
        percursotemp =
          percurso.substr(0, checkpoint_atual + 1) +
          "*" +
          percurso.substr(checkpoint_atual + 2, percurso.length);
      } else {
        percursotemp =
          percurso.substr(0, checkpoint_atual * unidade_percurso.length + 1) +
          "*" +
          percurso.substr(
            checkpoint_atual * unidade_percurso.length + 2,
            percurso.length
          );
      }

      console.log(
        percursotemp +
          " Estamos a uma velocidade de " +
          velocidade_media +
          "Kt. Distância percorrida: " +
          distancia_percorrida +
          "NM. Tempo de voo " +
          checkpoint_atual +
          "h."
      );
      distancia_percorrida = distancia_percorrida + velocidade_media;
      ++checkpoint_atual;

      await sleep(1000);
    } while (distancia_percorrida < distancia_origem_destino);

    console.log("Atencao Sr. passageiros. Chegamos ao nosso destino.");
    // Fim Navegacao
  } else {
    console.log("Voo não liberado. Tempo ruim.");
  }
}

// Variaveis para alternar
clima = "ceu_azul";
distancia_origem_destino = 2000;
altitude = 1000;

//Unidade de tempo foi resuzidade horas para segundos
viajar_aviao(clima, distancia_origem_destino, altitude);
