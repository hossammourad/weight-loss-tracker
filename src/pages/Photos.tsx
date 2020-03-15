import React, { FC } from "react";
import { IonContent, IonPage, IonGrid, IonRow, IonIcon, IonText } from "@ionic/react";
import { sadOutline } from "ionicons/icons";
import useForceUpdate from "use-force-update";

import { AddPhotos, PhotosList } from "../components";
import { getPhotos } from "../data/photos";
import { groupByDate } from "../data/utils";

export const Photos: FC = () => {
  let photos = getPhotos();
  const forceUpdate = useForceUpdate();

  const refreshList = () => {
    photos = getPhotos();
    forceUpdate();
  };

  const renderPhotos = () => {
    if (!photos || photos.length === 0) {
      return (
        <IonGrid className="ion-margin-vertical ion-text-center ion-text-large">
          <IonRow className="ion-justify-content-center">
            <IonIcon
              icon={sadOutline}
              size="large"
              className="ion-margin-vertical"
              color="medium"
            ></IonIcon>
            <IonText color="medium" style={{ fontSize: "1.2rem", fontWeight: 500 }}>
              No photos yet, start by adding uploading your photos using the Add button above
            </IonText>
          </IonRow>
        </IonGrid>
      );
    }

    return <PhotosList photos={groupByDate(photos)} refreshList={refreshList} />;
  };

  return (
    <IonPage>
      <IonContent class="ion-padding">
        <AddPhotos refreshList={refreshList} />
        {renderPhotos()}
      </IonContent>
    </IonPage>
  );
};
