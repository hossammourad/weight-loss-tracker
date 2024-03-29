import React, { FC, SyntheticEvent, useState } from "react";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonDatetime,
  IonButton,
  IonIcon,
  IonRow,
  IonAlert
} from "@ionic/react";
import { rocketOutline } from "ionicons/icons";

import { addWeight } from "../data/weight/";

interface Props {
  hide: () => void;
  refreshList: () => void;
}

export const AddWeightEntry: FC<Props> = ({ hide, refreshList }) => {
  const [weightVal, setWeigtVal] = useState(0);
  const [dateVal, setDateVal] = useState(new Date().toISOString());
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);

  const onAdd = (e: SyntheticEvent) => {
    e.preventDefault();
    const result = addWeight({ weightVal, date: dateVal });
    if (!result) setIsErrorAlertVisible(true);
    if (result) {
      hide();
      refreshList();
    }
  };

  const renderAlert = () => {
    if (!isErrorAlertVisible) return false;
    return (
      <IonAlert
        isOpen
        onDidDismiss={() => setIsErrorAlertVisible(false)}
        header="Error!"
        message={
          "You have already added your weight for that date, if you want to modify it please remove it from the list below first and then add it again."
        }
        buttons={["OK"]}
      />
    );
  };

  return (
    <form onSubmit={onAdd}>
      <IonItem>
        <IonLabel position="stacked">
          <IonText>Enter Weight</IonText>
        </IonLabel>
        <IonInput
          autofocus
          required
          inputMode="decimal"
          type="number"
          value={weightVal}
          onIonChange={e => setWeigtVal(Number(e.detail.value))}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">
          <IonText>Date</IonText>
        </IonLabel>
        <IonDatetime
          displayFormat="DD MMMM YYYY"
          placeholder="Select Date"
          value={dateVal}
          onIonChange={e => setDateVal(String(e.detail.value))}
        ></IonDatetime>
      </IonItem>

      <IonRow className="ion-justify-content-center ion-margin-top">
        <IonButton type="submit">
          <IonLabel style={{ marginRight: "1rem" }}>Add it</IonLabel>
          <IonIcon icon={rocketOutline} />
        </IonButton>
      </IonRow>

      {renderAlert()}
    </form>
  );
};
