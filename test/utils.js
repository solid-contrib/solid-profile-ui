import { rdflib } from 'solid-client'

export function createProfileGraph (webId) {
  const profileTTL = `
      @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
      <>
          a <http://xmlns.com/foaf/0.1/PersonalProfileDocument> ;
          <http://xmlns.com/foaf/0.1/maker> <#me> ;
          <http://xmlns.com/foaf/0.1/primaryTopic> <#me> .
      <#me>
          a <http://xmlns.com/foaf/0.1/Person> ;
          <http://www.w3.org/ns/pim/space#preferencesFile> <../Preferences/prefs.ttl> ;
          <http://www.w3.org/ns/pim/space#storage> <../> ;
          <http://www.w3.org/ns/solid/terms#inbox> <../Inbox/> ;
          <http://www.w3.org/ns/solid/terms#publicTypeIndex> <publicTypeIndex.ttl> ;
          <http://www.w3.org/ns/solid/terms#timeline> <../Timeline/> ;
          <http://xmlns.com/foaf/0.1/familyName> "Example" ;
          <http://xmlns.com/foaf/0.1/givenName> "Neat" ;
          <http://xmlns.com/foaf/0.1/img> <neat_example.jpg> ;
          <http://xmlns.com/foaf/0.1/mbox> <mailto:neat_example@example.com> ;
          <http://xmlns.com/foaf/0.1/name> "Neat Example" ;
          <http://xmlns.com/foaf/0.1/phone> <tel:123-456-7890> .
    `
  const graph = rdflib.graph()
  rdflib.parse(profileTTL, graph, webId, 'text/turtle')
  return graph
}
