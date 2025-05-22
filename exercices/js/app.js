    document.getElementById('codePostal').addEventListener('input', function() {
      const codePostal = this.value;
      if (codePostal.length === 5 && /^[0-9]{5}$/.test(codePostal)) {
        fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}&fields=nom,code&format=json`)
          .then(response => response.json())
          .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.length > 0) {
              resultDiv.innerHTML = '<ul>' + data.map(commune => `<li>${commune.nom} (Code INSEE: ${commune.code})</li>`).join('') + '</ul>';
            } else {
              resultDiv.textContent = 'Aucune commune trouvée pour ce code postal.';
            }
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
          });
      }
    });