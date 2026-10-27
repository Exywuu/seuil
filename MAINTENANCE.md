# Maintenance technique — Le Seuil

Ce document rassemble les vérifications de maintenance réalisées après la création du prototype. Il ne constitue pas un audit de sécurité complet.

## Dépendances

Lors de la préparation du dépôt le 27 octobre 2026, `npm audit --omit=dev` a signalé quatre avis concernant Better Auth et Zod : deux de sévérité faible, un élevé et un critique. Ces classifications proviennent de l’outil ; **l’exploitabilité et l’impact sur ce prototype n’ont pas été établis**.

Une mise à jour expérimentale de Zod vers 4.6.6, dans une copie séparée, a supprimé l’avis Zod de l’audit. Dans cette copie, la vérification TypeScript et 59 tests de la seconde partie de la commande ont réussi ; la première partie de la commande de tests n’a sélectionné aucun test sous Windows. Cette modification expérimentale n’a pas été publiée.

La mise à jour expérimentale de Better Auth vers 1.7.14 a supprimé les avis restants de l’audit, mais a révélé deux erreurs TypeScript liées aux API OAuth. La version 1.7 change également les URL de retour OAuth ; leur compatibilité avec le service d’authentification n’a pas été vérifiée. Elle n’a donc pas été publiée. Consulter le [guide officiel de migration](https://better-auth.com/docs/guides/1-7-upgrade-guide).

**État :** les dépendances publiées n’ont pas encore été corrigées ; il faut valider la migration et les parcours de connexion avant toute mise en production. Les autres projets Daybreak n’ont pas nécessairement reçu le même contrôle.

## Compilation et hébergement

La commande `npm ci --ignore-scripts` a abouti dans une copie Windows. La compilation d’origine `npm run build` y a échoué avec `spawn vite ENOENT`. Le projet utilise un rendu serveur Nitro/Vercel ; une adaptation et des vérifications sont nécessaires pour GitHub Pages. La connexion de prévisualisation Grok n’est pas configurée dans la copie publique : un secret de prévisualisation a été exclu.

## Pistes de vérification

- Mettre à jour les dépendances dans un environnement isolé et contrôler le verrou des versions.
- Adapter les appels et URL OAuth selon le guide de migration, puis vérifier les parcours légitimes et les rejets avec le fournisseur concerné.
- Exécuter l’ensemble des tests, la compilation et des essais en navigateur sur la version construite.
- Réexécuter l’audit après correction et documenter les limites restantes.
